package server

import (
	"context"

	"github.com/lestrrat-go/jwx/v2/jwa"
	"github.com/lestrrat-go/jwx/v2/jwt"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
	"google.golang.org/grpc/status"

	"github.com/fogo-sh/bogos/backend/pkg/database"
)

func (s Server) authorize(ctx context.Context) (database.User, error) {
	md, found := metadata.FromIncomingContext(ctx)
	if !found {
		return database.User{}, status.Error(codes.Unauthenticated, "no authorization token provided")
	}

	token := md.Get("authorization")
	if len(token) != 1 {
		return database.User{}, status.Error(codes.Unauthenticated, "no authorization token provided")
	}

	verifiedToken, err := jwt.Parse([]byte(token[0]), jwt.WithKey(jwa.HS512, s.config.JwtSecret))
	if err != nil {
		return database.User{}, status.Errorf(codes.Unauthenticated, "invalid token provided: %v", err)
	}

	user, err := s.db.GetUserByUsername(ctx, verifiedToken.Subject())
	if err != nil {
		log.Error().Err(err).Msg("Error getting user for provided authentication token")
		return database.User{}, status.Errorf(codes.Internal, "")
	}

	return user, nil
}
