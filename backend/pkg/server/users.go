package server

import (
	"context"
	"database/sql"
	"errors"
	"time"

	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
	"golang.org/x/crypto/bcrypt"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/fogo-sh/bogos/backend/pkg/database"
	"github.com/fogo-sh/bogos/backend/pkg/proto"
)

type usersService struct {
	server *Server
	logger zerolog.Logger
	proto.UnimplementedUsersServer
}

func (u usersService) GetJwt(ctx context.Context, request *proto.GetJwtRequest) (*proto.GetJwtReply, error) {
	u.logger.Info().Str("method", "GetJwt").Msg("Begin request.")

	user, err := u.server.db.GetUserByUsername(ctx, request.GetUsername())
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			log.Warn().Str("username", request.GetUsername()).Msg("Attempted to fetch JWT with invalid username")
			return nil, status.Error(codes.PermissionDenied, "invalid username or password")
		} else {
			u.logger.Error().Err(err).Msg("Error fetching user")
			return nil, status.Error(codes.Internal, "")
		}
	}

	err = bcrypt.CompareHashAndPassword(user.PasswordHash, []byte(request.GetPassword()))
	if err != nil {
		if errors.Is(err, bcrypt.ErrMismatchedHashAndPassword) {
			log.Warn().Str("username", request.GetUsername()).Msg("Attempted to fetch JWT with invalid password")
			return nil, status.Error(codes.PermissionDenied, "invalid username or password")
		} else {
			u.logger.Error().Err(err).Msg("Error comparing password")
			return nil, status.Error(codes.Internal, "")
		}
	}

	tok, err := jwt.NewBuilder().
		IssuedAt(time.Now()).
		Subject(user.Username).
		Build()
	if err != nil {
		u.logger.Error().Err(err).Msg("Error building JWT")
		return nil, status.Error(codes.Internal, "")
	}

	signed, err := jwt.Sign(tok, jwt.WithKey(jwa.HS512, u.server.config.JwtSecret))
	if err != nil {
		u.logger.Error().Err(err).Msg("Error signing JWT")
		return nil, status.Error(codes.Internal, "")
	}

	u.logger.Info().Str("username", user.Username).Msg("JWT fetched")

	return &proto.GetJwtReply{Jwt: string(signed)}, nil
}

func (u usersService) GetCurrentUser(ctx context.Context, _ *proto.GetCurrentUserRequest) (*proto.User, error) {
	u.logger.Info().Str("method", "GetCurrentUser").Msg("Begin request.")

	currentUser, err := u.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	return &proto.User{
		Id:          currentUser.ID,
		Username:    currentUser.Username,
		DisplayName: database.NullStringToPtr(currentUser.DisplayName),
		AvatarUrl:   database.NullStringToPtr(currentUser.AvatarUrl),
		CreatedAt:   timestamppb.New(currentUser.CreatedAt),
		UpdatedAt:   database.NullTimeToTimestamppb(currentUser.UpdatedAt),
	}, nil
}

func (u usersService) UpdateCurrentUser(ctx context.Context, request *proto.UpdateCurrentUserRequest) (*proto.User, error) {
	u.logger.Info().Str("method", "GetCurrentUser").Msg("Begin request.")

	currentUser, err := u.server.authorize(ctx)
	if err != nil {
		return nil, err
	}

	updateParams := database.UpdateUserParams{
		ID: currentUser.ID,
	}

	if request.UpdateAvatarUrl {
		updateParams.AvatarUrl = database.PtrToNullString(request.AvatarUrl)
	} else {
		updateParams.AvatarUrl = currentUser.AvatarUrl
	}

	if request.UpdateDisplayName {
		updateParams.DisplayName = database.PtrToNullString(request.DisplayName)
	} else {
		updateParams.DisplayName = currentUser.DisplayName
	}

	if request.UpdatePassword {
		newHash, err := bcrypt.GenerateFromPassword([]byte(request.GetPassword()), bcrypt.DefaultCost)
		if err != nil {
			log.Error().Err(err).Msg("Error hashing new password")
			return nil, status.Error(codes.Internal, "")
		}
		updateParams.PasswordHash = newHash
	} else {
		updateParams.PasswordHash = currentUser.PasswordHash
	}

	newUser, err := u.server.db.UpdateUser(ctx, updateParams)

	return &proto.User{
		Id:          newUser.ID,
		Username:    newUser.Username,
		DisplayName: database.NullStringToPtr(newUser.DisplayName),
		AvatarUrl:   database.NullStringToPtr(newUser.AvatarUrl),
		CreatedAt:   timestamppb.New(newUser.CreatedAt),
		UpdatedAt:   database.NullTimeToTimestamppb(newUser.UpdatedAt),
	}, nil
}

func newUsersService(server *Server) *usersService {
	return &usersService{
		server: server,
		logger: log.With().Str("service", "users").Logger(),
	}
}
