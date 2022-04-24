package database

import (
	"database/sql"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func NullStringToPtr(value sql.NullString) *string {
	if value.Valid {
		return &value.String
	}
	return nil
}

func NullTimeToTimestamppb(value sql.NullTime) *timestamppb.Timestamp {
	if value.Valid {
		return timestamppb.New(value.Time)
	}
	return nil
}
