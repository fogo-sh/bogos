package proto

import (
	"google.golang.org/protobuf/types/known/timestamppb"

	"github.com/fogo-sh/bogos/backend/pkg/database"
)

func DBUserToProtoUser(user database.User) *User {
	return &User{
		Id:          user.ID,
		Username:    user.Username,
		DisplayName: database.NullStringToPtr(user.DisplayName),
		AvatarUrl:   database.NullStringToPtr(user.AvatarUrl),
		CreatedAt:   timestamppb.New(user.CreatedAt),
		UpdatedAt:   database.NullTimeToTimestamppb(user.UpdatedAt),
	}
}

func DBOutingToProtoOuting(outing database.Outing) *Outing {
	return &Outing{
		Id:        outing.ID,
		Title:     outing.Title,
		Date:      timestamppb.New(outing.Date),
		CreatedAt: timestamppb.New(outing.CreatedAt),
		UpdatedAt: database.NullTimeToTimestamppb(outing.UpdatedAt),
	}
}
