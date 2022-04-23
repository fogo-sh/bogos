package cmd

import (
	"github.com/spf13/cobra"
)

var dbCmd = &cobra.Command{
	Use:     "db",
	Aliases: []string{"database", "migrate"},
	Short:   "Interact with the database state",
}

func init() {
	rootCmd.AddCommand(dbCmd)
}
