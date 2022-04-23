package database

import (
	"fmt"
	"strings"

	"github.com/golang-migrate/migrate/v4"
	"github.com/rs/zerolog"
)

// zerologMigrationLogger wraps a zerolog.Logger to make it compatible with golang-migrate
type zerologMigrationLogger struct {
	logger zerolog.Logger
}

func (z zerologMigrationLogger) Printf(format string, v ...interface{}) {
	output := fmt.Sprintf(format, v...)
	// Printf normally requires explicitly adding a trailing newline, but Zerolog automatically inserts it for us
	output = strings.TrimSuffix(output, "\n")
	z.logger.Printf(output)
}

func (z zerologMigrationLogger) Verbose() bool {
	return z.logger.GetLevel() == zerolog.DebugLevel
}

var _ migrate.Logger = (*zerologMigrationLogger)(nil)
