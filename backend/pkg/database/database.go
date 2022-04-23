package database

import (
	"database/sql"

	_ "github.com/lib/pq"

	"github.com/fogo-sh/bogos/backend/pkg/config"
)

func Connect(config *config.Config) (*Queries, error) {
	db, err := sql.Open("postgres", config.DBConnectionString)
	if err != nil {
		return nil, err
	}

	return New(db), nil
}
