package database

import (
	"database/sql"
)

func Connect(connectionString string) (*Queries, error) {
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		return nil, err
	}

	return New(db), nil
}
