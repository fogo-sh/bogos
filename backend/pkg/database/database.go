package database

import (
	"database/sql"
	"embed"
	"fmt"

	"github.com/golang-migrate/migrate/v4"
	"github.com/golang-migrate/migrate/v4/database/postgres"
	"github.com/golang-migrate/migrate/v4/source/iofs"
	_ "github.com/lib/pq"
	"github.com/rs/zerolog/log"

	"github.com/fogo-sh/bogos/backend/pkg/config"
)

//go:embed migrations
var migrationsFs embed.FS

func NewMigrateInstance(config *config.Config) (*migrate.Migrate, error) {
	db, err := sql.Open("postgres", config.DBConnectionString)
	if err != nil {
		return nil, fmt.Errorf("error connecting to db: %w", err)
	}

	driver, err := postgres.WithInstance(db, &postgres.Config{})
	if err != nil {
		return nil, fmt.Errorf("error creating postgres migrate driver: %w", err)
	}

	migrationSource, err := iofs.New(migrationsFs, "migrations")
	if err != nil {
		return nil, fmt.Errorf("error creating migration source: %w", err)
	}

	migrateInstance, err := migrate.NewWithInstance(
		"iofs", migrationSource,
		"postgres", driver,
	)
	if err != nil {
		return nil, err
	}

	migrateInstance.Log = zerologMigrationLogger{log.Logger}

	return migrateInstance, nil
}

func Connect(config *config.Config) (*Queries, error) {
	db, err := sql.Open("postgres", config.DBConnectionString)
	if err != nil {
		return nil, err
	}

	return New(db), nil
}
