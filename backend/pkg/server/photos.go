package server

import (
	"context"
	"database/sql"
	"errors"
	"fmt"

	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"github.com/fogo-sh/bogos/backend/pkg/database"
	"github.com/fogo-sh/bogos/backend/pkg/proto"
)

type photosService struct {
	server        *Server
	logger        zerolog.Logger
	presignClient *s3.PresignClient

	proto.UnimplementedPhotosServer
}

func (p *photosService) ListOutingPhotos(ctx context.Context, request *proto.ListOutingPhotosRequest) (*proto.ListOutingPhotosReply, error) {
	var resp []*proto.Photo

	photos, err := p.server.db.ListPhotosForOuting(ctx, request.OutingId)
	if err != nil {
		p.logger.Error().Err(err).Str("operation", "ListOutingPhotos").Msg("Error listing photos for outing")
		return nil, status.Error(codes.Internal, "")
	}

	for _, photo := range photos {
		resp = append(
			resp,
			proto.DBPhotoToProtoPhoto(photo, p.server.config.PhotoUrlFormat),
		)
	}

	return &proto.ListOutingPhotosReply{Photos: resp}, nil
}

func (p *photosService) UploadPhoto(ctx context.Context, request *proto.UploadPhotoRequest) (*proto.UploadPhotoReply, error) {
	currentUser, err := p.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	_, err = p.server.db.GetOuting(ctx, request.OutingId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "no outing with that ID found")
		} else {
			p.logger.Error().Str("operation", "UploadPhoto").Err(err).Msg("Error getting outing")
			return nil, status.Error(codes.Internal, "")
		}
	}

	photoPath := fmt.Sprintf(
		"%d/%s.%s",
		request.OutingId,
		uuid.NewString(),
		request.Extension,
	)

	presignedRequest, err := p.presignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(p.server.config.S3BucketName),
		Key:    aws.String(photoPath),
	})
	if err != nil {
		p.logger.Error().Err(err).Str("operation", "UploadPhoto").Msg("Error presigning URL")
		return nil, status.Error(codes.Internal, "")
	}

	photo, err := p.server.db.CreatePhoto(ctx, database.CreatePhotoParams{
		Path:      photoPath,
		CreatorID: currentUser.ID,
		OutingID:  request.OutingId,
	})
	if err != nil {
		p.logger.Error().Err(err).Str("operation", "UploadPhoto").Msg("Error inserting new photo")
		return nil, status.Error(codes.Internal, "")
	}

	return &proto.UploadPhotoReply{
		UploadUrl: presignedRequest.URL,
		Photo:     proto.DBPhotoToProtoPhoto(photo, p.server.config.PhotoUrlFormat),
	}, nil
}

func newPhotosService(server *Server) *photosService {
	config := aws.Config{
		Credentials: credentials.NewStaticCredentialsProvider(server.config.S3AccessKeyId, server.config.S3SecretAccessKey, ""),
		EndpointResolver: aws.EndpointResolverFunc(func(service, region string) (aws.Endpoint, error) {
			if service != "S3" {
				return aws.Endpoint{}, fmt.Errorf("unsupported service: %s", service)
			}

			return aws.Endpoint{
				PartitionID:       "aws",
				URL:               server.config.S3Endpoint,
				HostnameImmutable: true,
			}, nil
		}),
	}
	presignClient := s3.NewPresignClient(s3.NewFromConfig(config))

	return &photosService{
		server:        server,
		logger:        log.With().Str("service", "photos").Logger(),
		presignClient: presignClient,
	}
}