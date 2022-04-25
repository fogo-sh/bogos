package database

import (
	"database/sql"

	"google.golang.org/protobuf/types/known/timestamppb"
)

func PtrToNullString(value *string) sql.NullString {
	if value == nil {
		return sql.NullString{
			Valid:  false,
			String: "",
		}
	}
	return sql.NullString{
		Valid:  true,
		String: *value,
	}
}

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
