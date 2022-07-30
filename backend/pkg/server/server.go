package server

import (
	"fmt"
	"net"

	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"

	"github.com/fogo-sh/bogos/backend/pkg/config"
	"github.com/fogo-sh/bogos/backend/pkg/database"
	"github.com/fogo-sh/bogos/backend/pkg/proto"
)

type Server struct {
	db         *database.Queries
	config     *config.Config
	grpcServer *grpc.Server
}

func (s *Server) Run() error {
	log.Debug().Msg("Starting server.")
	listener, err := net.Listen("tcp", s.config.ListenAddr)
	if err != nil {
		return fmt.Errorf("error creating listener: %w", err)
	}

	log.Info().Msg("Starting Bogos. Press Ctrl-C to quit.")
	err = s.grpcServer.Serve(listener)
	if err != nil {
		return fmt.Errorf("error running gRPC server: %w", err)
	}

	return nil
}

func New(config *config.Config) (*Server, error) {
	log.Debug().Msg("Creating new server.")
	db, err := database.Connect(config)
	if err != nil {
		return nil, fmt.Errorf("error connecting to db: %w", err)
	}

	grpcServer := grpc.NewServer()

	server := &Server{
		config:     config,
		db:         db,
		grpcServer: grpcServer,
	}

	log.Debug().Msg("Registering services.")
	reflection.Register(grpcServer)
	proto.RegisterUsersServer(grpcServer, newUsersService(server))
	proto.RegisterOutingsServer(grpcServer, newOutingsService(server))
	proto.RegisterPhotosServer(grpcServer, newPhotosService(server))
	log.Debug().Msg("Services registered.")

	log.Debug().Msg("Server created.")
	return server, nil
}
