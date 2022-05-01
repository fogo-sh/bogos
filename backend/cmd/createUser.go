package cmd

import (
	"context"

	"github.com/AlecAivazis/survey/v2"
	"github.com/rs/zerolog/log"
	"github.com/spf13/cobra"
	"golang.org/x/crypto/bcrypt"

	"github.com/fogo-sh/bogos/backend/pkg/config"
	"github.com/fogo-sh/bogos/backend/pkg/database"
)

var createUserCmd = &cobra.Command{
	Use:   "user",
	Short: "Create a new user",
	Run: func(cmd *cobra.Command, args []string) {
		cfg, err := config.Load()
		if err != nil {
			log.Fatal().Err(err).Msg("Error loading config")
		}

		queries, err := database.Connect(cfg)
		if err != nil {
			log.Fatal().Err(err).Msg("Error connecting to database")
		}

		answers := struct {
			Username string
			Password string
		}{}

		err = survey.Ask([]*survey.Question{
			{
				Name:   "Username",
				Prompt: &survey.Input{Message: "Username:"},
			},
			{
				Name:   "Password",
				Prompt: &survey.Password{Message: "Password:"},
			},
		}, &answers)
		if err != nil {
			log.Fatal().Err(err).Msg("Error getting input values")
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(answers.Password), bcrypt.DefaultCost)
		if err != nil {
			log.Fatal().Err(err).Msg("Error hashing password")
		}

		user, err := queries.CreateUser(context.Background(), database.CreateUserParams{
			Username:     answers.Username,
			PasswordHash: hash,
		})
		if err != nil {
			log.Fatal().Err(err).Msg("Error creating user")
		}

		log.Info().Int32("id", user.ID).Msg("User created")
	},
}

func init() {
	createCmd.AddCommand(createUserCmd)
}
