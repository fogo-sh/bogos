package server

import (
	"context"

	"github.com/fogo-sh/bogos/backend/pkg/proto"
)

type userService struct {
	proto.UnimplementedUserServiceServer
}

func (u userService) GetJwt(ctx context.Context, request *proto.GetJwtRequest) (*proto.GetJwtReply, error) {
	return &proto.GetJwtReply{Jwt: request.GetUsername()}, nil
}

func NewUserService() *userService {
	return &userService{}
}
