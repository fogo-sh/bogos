package config

import (
	"fmt"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
)

type Config struct {
	DBConnectionString string `split_words:"true" default:"user=bogos password=bogos-binted dbname=bogos sslmode=disable"`
}

var loadedConfig *Config

func Load() (*Config, error) {
	if loadedConfig != nil {
		return loadedConfig, nil
	}

	err := godotenv.Load()
	if err != nil {
		fmt.Printf("Error loading .env file: %v\n", err)
	}

	var newConfig Config

	err = envconfig.Process("bogos", &newConfig)
	if err != nil {
		return nil, fmt.Errorf("error loading config: %w", err)
	}

	loadedConfig = &newConfig

	return loadedConfig, nil
}
