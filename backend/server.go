package main

import (
	"log"
	"net"

	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"github.com/fogo-sh/bogos/backend/pkg/proto"
	"github.com/fogo-sh/bogos/backend/pkg/server"
)

func main() {
	lis, err := net.Listen("tcp", "localhost:9999")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	var opts []grpc.ServerOption

	grpcServer := grpc.NewServer(opts...)
	proto.RegisterUserServiceServer(grpcServer, server.NewUserService())
	reflection.Register(grpcServer)
	grpcServer.Serve(lis)
}
