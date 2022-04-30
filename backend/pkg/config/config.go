package config

import (
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"github.com/kelseyhightower/envconfig"
	"github.com/rs/zerolog"
	"github.com/rs/zerolog/log"
)

type Config struct {
	DBConnectionString string `split_words:"true" default:"user=bogos password=bogos-binted dbname=bogos sslmode=disable"`
	ListenAddr         string `split_words:"true" default:"localhost:9999"`
	LogLevel           string `split_words:"true" default:"debug"`
	UseJsonLogging     bool   `split_words:"true" default:"false"`
	JwtSecret          []byte `split_words:"true" default:"bogos-binted"`
}

var loadedConfig *Config

func Load() (*Config, error) {
	if loadedConfig != nil {
		return loadedConfig, nil
	}

	err := godotenv.Load()
	if err != nil && !os.IsNotExist(err) {
		log.Warn().Err(err).Msg("Error loading .env file")
	}

	var newConfig Config

	err = envconfig.Process("bogos", &newConfig)
	if err != nil {
		return nil, fmt.Errorf("error loading config: %w", err)
	}

	logLevel, err := zerolog.ParseLevel(newConfig.LogLevel)
	if err != nil {
		return nil, fmt.Errorf("error parsing provided log level: %w", err)
	}

	zerolog.SetGlobalLevel(logLevel)

	if !newConfig.UseJsonLogging {
		log.Logger = log.Output(zerolog.ConsoleWriter{Out: os.Stdout})
	}

	log.Debug().Msg("Config loaded.")

	loadedConfig = &newConfig

	return loadedConfig, nil
}