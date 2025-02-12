package database

import (
	"fmt"

	"github.com/Sef-Hk/State-Full-authentication/backend/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

const (
	host     = "localhost"
	port     = 5432
	user     = "postgres"
	password = "xxxx"
	dbname   = "State-Full-auth"
)

func Connect() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)

	connection, err := gorm.Open(postgres.Open(psqlInfo), &gorm.Config{})
	if err != nil {
		panic("could not connect to the database")
	}
	DB = connection
	connection.AutoMigrate(&models.User{})
}
