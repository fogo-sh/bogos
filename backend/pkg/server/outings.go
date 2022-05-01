package server

import (
	"context"
	"database/sql"
	"errors"
	"fmt"
	"math/rand"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/emptypb"

	"github.com/fogo-sh/bogos/backend/pkg/database"
	"github.com/fogo-sh/bogos/backend/pkg/proto"
)

type outingsService struct {
	server *Server
	logger zerolog.Logger

	proto.UnimplementedOutingsServer
}

var testingOutings = map[int32]database.Outing{
	1: {
		ID:        1,
		Title:     "First outing",
		Date:      time.Date(2022, 4, 30, 0, 0, 0, 0, time.UTC),
		CreatedAt: time.Date(2022, 4, 30, 0, 0, 0, 0, time.UTC),
		UpdatedAt: sql.NullTime{},
	},
	2: {
		ID:        2,
		Title:     "Second outing",
		Date:      time.Date(2022, 3, 30, 0, 0, 0, 0, time.UTC),
		CreatedAt: time.Date(2022, 4, 30, 0, 0, 0, 0, time.UTC),
		UpdatedAt: sql.NullTime{
			Time:  time.Date(2022, 4, 30, 5, 0, 0, 0, time.UTC),
			Valid: true,
		},
	},
}

var testOutingUsers = map[int32][]database.User{
	1: {
		{
			ID:           1,
			Username:     "jackharrhy",
			PasswordHash: nil,
			DisplayName: sql.NullString{
				Valid:  true,
				String: "Jack Harrhy",
			},
			AvatarUrl: sql.NullString{
				Valid:  true,
				String: "https://avatars.githubusercontent.com/u/6486417",
			},
			CreatedAt: time.Date(2022, 4, 30, 0, 0, 0, 0, time.UTC),
		},
	},
	2: {
		{
			ID:           1,
			Username:     "jackharrhy",
			PasswordHash: nil,
			DisplayName: sql.NullString{
				Valid:  true,
				String: "Jack Harrhy",
			},
			AvatarUrl: sql.NullString{
				Valid:  true,
				String: "https://avatars.githubusercontent.com/u/6486417",
			},
			CreatedAt: time.Date(2022, 4, 30, 0, 0, 0, 0, time.UTC),
		},
		{
			ID:           2,
			Username:     "nint8835",
			PasswordHash: nil,
			DisplayName: sql.NullString{
				Valid:  true,
				String: "Riley Flynn",
			},
			AvatarUrl: sql.NullString{
				Valid:  true,
				String: "https://avatars.githubusercontent.com/u/1741548",
			},
			CreatedAt: time.Date(2022, 4, 30, 0, 0, 0, 0, time.UTC),
		},
	},
}

func (o *outingsService) CreateOuting(ctx context.Context, request *proto.CreateOutingRequest) (*proto.Outing, error) {
	_, err := o.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	outing, err := o.server.db.CreateOuting(ctx, database.CreateOutingParams{
		Title: request.GetTitle(),
		Date:  request.GetDate().AsTime(),
	})
	if err != nil {
		o.logger.Error().Str("operation", "CreateOuting").Err(err).Msg("Error creating outing")
		return nil, status.Error(codes.Internal, "")
	}

	return proto.DBOutingToProtoOuting(outing), nil
}

func (o *outingsService) UpdateOuting(ctx context.Context, request *proto.UpdateOutingRequest) (*proto.Outing, error) {
	_, err := o.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	currentOuting, err := o.server.db.GetOuting(ctx, request.OutingId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "no outing with that ID found")
		} else {
			o.logger.Error().Str("operation", "UpdateOuting").Err(err).Msg("Error getting current outing")
			return nil, status.Error(codes.Internal, "")
		}
	}

	updateParams := database.UpdateOutingParams{
		ID: request.OutingId,
	}

	if request.UpdateTitle {
		updateParams.Title = request.Title
	} else {
		updateParams.Title = currentOuting.Title
	}

	if request.UpdateDate {
		updateParams.Date = request.Date.AsTime()
	} else {
		updateParams.Date = currentOuting.Date
	}

	newOuting, err := o.server.db.UpdateOuting(ctx, updateParams)
	if err != nil {
		log.Error().Str("operation", "UpdateOuting").Err(err).Msg("Error updating outing")
		return nil, status.Error(codes.Internal, "")
	}

	return proto.DBOutingToProtoOuting(newOuting), nil
}

func (o *outingsService) ListOutings(_ context.Context, _ *emptypb.Empty) (*proto.ListOutingsReply, error) {
	var resp []*proto.Outing

	for _, outing := range testingOutings {
		resp = append(
			resp,
			proto.DBOutingToProtoOuting(outing),
		)
	}

	return &proto.ListOutingsReply{Outings: resp}, nil
}

func (o *outingsService) ListOutingUsers(_ context.Context, request *proto.ListOutingUsersRequest) (*proto.ListOutingUsersReply, error) {
	var resp []*proto.User

	for _, user := range testOutingUsers[request.OutingId] {
		resp = append(
			resp,
			proto.DBUserToProtoUser(user),
		)
	}

	return &proto.ListOutingUsersReply{Users: resp}, nil
}

func (o *outingsService) AddUser(ctx context.Context, request *proto.OutingAddUserRequest) (*emptypb.Empty, error) {
	_, err := o.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	_, err = o.server.db.GetOuting(ctx, request.OutingId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "no outing with that ID found")
		} else {
			o.logger.Error().Str("operation", "AddUser").Err(err).Msg("Error getting outing")
			return nil, status.Error(codes.Internal, "")
		}
	}
	_, err = o.server.db.GetUser(ctx, request.UserId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "no user with that ID found")
		} else {
			o.logger.Error().Str("operation", "AddUser").Err(err).Msg("Error getting user")
			return nil, status.Error(codes.Internal, "")
		}
	}

	alreadyInOuting, err := o.server.db.UserInOuting(ctx, database.UserInOutingParams{OutingID: request.OutingId, UserID: request.UserId})
	if err != nil {
		o.logger.Error().Str("operation", "AddUser").Err(err).Msg("Error checking if user is in outing")
		return nil, status.Error(codes.Internal, "")
	}

	if alreadyInOuting {
		return &emptypb.Empty{}, nil
	}

	err = o.server.db.AddUserToOuting(ctx, database.AddUserToOutingParams{OutingID: request.OutingId, UserID: request.UserId})
	if err != nil {
		o.logger.Error().Str("operation", "AddUser").Err(err).Msg("Error adding user to outing")
		return nil, status.Error(codes.Internal, "")
	}

	return &emptypb.Empty{}, nil
}

func (o *outingsService) RemoveUser(ctx context.Context, request *proto.OutingRemoveUserRequest) (*emptypb.Empty, error) {
	_, err := o.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	err = o.server.db.RemoveUserFromOuting(ctx, database.RemoveUserFromOutingParams{OutingID: request.OutingId, UserID: request.UserId})
	if err != nil {
		o.logger.Error().Str("operation", "RemoveUser").Err(err).Msg("Error removing user from outing")
		return nil, status.Error(codes.Internal, "")
	}

	return &emptypb.Empty{}, nil
}

func (o *outingsService) ListOutingPhotos(_ context.Context, request *proto.ListOutingPhotosRequest) (*proto.ListOutingPhotosReply, error) {
	var resp []*proto.Photo

	for i := 0; i < 50; i++ {
		photo := database.Photo{
			ID:   int32(rand.Intn(100000)),
			Path: "",
			Title: sql.NullString{
				Valid:  true,
				String: fmt.Sprintf("Cool Photo #%d", i),
			},
			CreatedAt: time.Date(2022, 4, 30, 0, 0, i, 0, time.UTC),
			UpdatedAt: sql.NullTime{},
			CreatorID: 0,
			OutingID:  0,
		}
		if photo.ID%2 == 0 {
			photo.Title = sql.NullString{}
		}
		resp = append(
			resp,
			proto.DBPhotoToProtoPhoto(photo),
		)
	}

	return &proto.ListOutingPhotosReply{Photos: resp}, nil
}

func newOutingsService(server *Server) *outingsService {
	return &outingsService{
		server: server,
		logger: log.With().Str("service", "outings").Logger(),
	}
}
