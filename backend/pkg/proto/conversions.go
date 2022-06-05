package proto

import (
	"fmt"

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

func DBPhotoToProtoPhoto(photo database.Photo, photoUrlFormat string) *Photo {
	return &Photo{
		Id:        photo.ID,
		Url:       fmt.Sprintf(photoUrlFormat, photo.Path),
		Title:     database.NullStringToPtr(photo.Title),
		CreatedAt: timestamppb.New(photo.CreatedAt),
		UpdatedAt: database.NullTimeToTimestamppb(photo.UpdatedAt),
	}
}
