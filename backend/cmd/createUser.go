package cmd

import (
	"context"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	_ "github.com/lib/pq"
	"github.com/spf13/cobra"
	"golang.org/x/crypto/bcrypt"

	"github.com/fogo-sh/bogos/backend/pkg/config"
	"github.com/fogo-sh/bogos/backend/pkg/database"
)

// createUserCmd represents the createUser command
var createUserCmd = &cobra.Command{
	Use:   "user",
	Short: "Create a new user",
	Long:  `Add a new user to the database for testing purposes.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		cfg, err := config.Load()
		if err != nil {
			return err
		}

		queries, err := database.Connect(cfg.DBConnectionString)
		if err != nil {
			return fmt.Errorf("error connecting to db: %w", err)
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
			return fmt.Errorf("error getting input values: %w", err)
		}

		hash, err := bcrypt.GenerateFromPassword([]byte(answers.Password), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("error hashing password: %w", err)
		}

		userId, err := queries.CreateUser(context.Background(), database.CreateUserParams{
			Username:     answers.Username,
			PasswordHash: hash,
		})
		if err != nil {
			return fmt.Errorf("error creating user: %w", err)
		}
		fmt.Printf("Created user %d\n", userId)

		return nil
	},
}

func init() {
	createCmd.AddCommand(createUserCmd)
}
