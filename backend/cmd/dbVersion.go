package cmd

import (
	"fmt"

	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	"github.com/fogo-sh/bogos/backend/pkg/config"
	"github.com/fogo-sh/bogos/backend/pkg/database"
)

var dbVersionCmd = &cobra.Command{
	Use:   "version",
	Short: "Fetch the current database version",
	Run: func(cmd *cobra.Command, args []string) {
		cfg, err := config.Load()
		if err != nil {
			log.Fatal().Err(err).Msg("Error loading config")
		}

		m, err := database.NewMigrateInstance(cfg)
		if err != nil {
			log.Fatal().Err(err).Msg("Error setting up migrations")
		}

		version, dirty, err := m.Version()
		if err != nil {
			log.Fatal().Err(err).Msg("Error getting database version")
		}

		log.Info().Bool("dirty", dirty).Msg(fmt.Sprintf("Version %d", version))
	},
}

func init() {
	dbCmd.AddCommand(dbVersionCmd)
}
