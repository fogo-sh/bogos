package server

import (
	"context"
	"database/sql"
	"errors"

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
		o.logger.Error().Str("operation", "UpdateOuting").Err(err).Msg("Error updating outing")
		return nil, status.Error(codes.Internal, "")
	}

	return proto.DBOutingToProtoOuting(newOuting), nil
}

func (o *outingsService) ListOutings(ctx context.Context, _ *emptypb.Empty) (*proto.ListOutingsReply, error) {
	var resp []*proto.Outing

	outings, err := o.server.db.ListOutings(ctx)
	if err != nil {
		o.logger.Error().Str("operation", "ListOutings").Err(err).Msg("Error listing outings")
		return nil, status.Error(codes.Internal, "")
	}

	for _, outing := range outings {
		resp = append(
			resp,
			proto.DBOutingToProtoOuting(outing),
		)
	}

	return &proto.ListOutingsReply{Outings: resp}, nil
}

func (o *outingsService) ListOutingUsers(ctx context.Context, request *proto.ListOutingUsersRequest) (*proto.ListOutingUsersReply, error) {
	var resp []*proto.User

	outingUsers, err := o.server.db.ListUsersForOuting(ctx, request.OutingId)
	if err != nil {
		o.logger.Error().Str("operation", "ListOutingUsers").Err(err).Msg("Error listing users for outing")
		return nil, status.Error(codes.Internal, "")
	}

	for _, user := range outingUsers {
		resp = append(
			resp,
			proto.DBUserToProtoUser(user),
		)
	}

	return &proto.ListOutingUsersReply{Users: resp}, nil
}

func (o *outingsService) GetOuting(ctx context.Context, request *proto.GetOutingRequest) (*proto.Outing, error) {
	outing, err := o.server.db.GetOuting(ctx, request.OutingId)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, status.Error(codes.NotFound, "no outing with that ID found")
		} else {
			o.logger.Error().Str("operation", "GetOuting").Err(err).Msg("Error getting outing")
			return nil, status.Error(codes.Internal, "")
		}
	}

	return proto.DBOutingToProtoOuting(outing), nil
}

func (o *outingsService) ListUserOutings(ctx context.Context, request *proto.ListUserOutingsRequest) (*proto.ListUserOutingsReply, error) {
	var resp []*proto.Outing

	outings, err := o.server.db.ListUserOutings(ctx, request.UserId)
	if err != nil {
		o.logger.Error().Str("operation", "ListUserOutings").Err(err).Msg("Error listing outings")
		return nil, status.Error(codes.Internal, "")
	}

	for _, outing := range outings {
		resp = append(resp, proto.DBOutingToProtoOuting(outing))
	}

	return &proto.ListUserOutingsReply{Outings: resp}, nil
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

func newOutingsService(server *Server) *outingsService {
	return &outingsService{
		server: server,
		logger: log.With().Str("service", "outings").Logger(),
	}
}
