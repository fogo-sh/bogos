package cmd

import (
	"context"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	"github.com/spf13/cobra"
	"golang.org/x/crypto/bcrypt"

	"github.com/fogo-sh/bogos/backend/pkg/database"
)

// createUserCmd represents the createUser command
var createUserCmd = &cobra.Command{
	Use:   "user",
	Short: "Create a new user",
	Long:  `Add a new user to the database for testing purposes.`,
	RunE: func(cmd *cobra.Command, args []string) error {
		ctx := context.Background()

		db, err := sql.Open("postgres", "user=bogos password=bogos-binted dbname=bogos sslmode=disable")
		if err != nil {
			return fmt.Errorf("error connecting to db: %w", err)
		}

		hash, err := bcrypt.GenerateFromPassword([]byte("test"), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("error hashing password: %w", err)
		}

		queries := database.New(db)

		userId, err := queries.CreateUser(ctx, database.CreateUserParams{
			Username:     "test",
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
