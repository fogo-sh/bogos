package server

import (
	"context"
	"database/sql"
	"time"

	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"

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

func (o *outingsService) ListOutings(_ context.Context, _ *proto.ListOutingsRequest) (*proto.ListOutingsReply, error) {
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

func newOutingsService(server *Server) *outingsService {
	return &outingsService{
		server: server,
		logger: log.With().Str("service", "outings").Logger(),
	}
}
