package server

import (
	"context"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

	"github.com/fogo-sh/bogos/backend/pkg/proto"
)

type usersService struct {
	server *Server
	logger zerolog.Logger
	proto.UnimplementedUsersServer
}

func (u usersService) GetJwt(ctx context.Context, request *proto.GetJwtRequest) (*proto.GetJwtReply, error) {
	u.logger.Info().Msg("Begin GetJwt request.")
	return &proto.GetJwtReply{Jwt: request.GetUsername()}, nil
}

func newUsersService(server *Server) *usersService {
	return &usersService{
		server: server,
		logger: log.With().Str("service", "users").Logger(),
	}
}
