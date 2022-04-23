package cmd

import (
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"

	"github.com/fogo-sh/bogos/backend/pkg/config"
	"github.com/fogo-sh/bogos/backend/pkg/server"
)

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "Run the Bogos backend",
	Run: func(cmd *cobra.Command, args []string) {
		cfg, err := config.Load()
		if err != nil {
			log.Fatal().Err(err).Msg("Error loading config")
		}

		serv, err := server.New(cfg)
		if err != nil {
			log.Fatal().Err(err).Msg("Error creating server")
		}

		err = serv.Run()
		if err != nil {
			log.Fatal().Err(err).Msg("Error running server")
		}
	},
}

func init() {
	rootCmd.AddCommand(runCmd)
}
