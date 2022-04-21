package cmd

import (
	"github.com/spf13/cobra"
)

// createCmd represents the create command
var createCmd = &cobra.Command{
	Use:   "create",
	Short: "Create new resources",
	Long:  `Create new resources directly without interacting with the Bogos API.`,
}

func init() {
	rootCmd.AddCommand(createCmd)
}
