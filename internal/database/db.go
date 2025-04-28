package database

import (
	"fmt"
	"log"
	"os"

	"github.com/sunleity/stock-go/internal/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var DB *gorm.DB

func InitDB() {
	var err error
	dbPath := "stock.db"

	newLogger := logger.New(
		log.New(os.Stdout, "\r\n", log.LstdFlags),
		logger.Config{
			LogLevel: logger.Info,
		},
	)

	DB, err = gorm.Open(sqlite.Open(dbPath), &gorm.Config{
		Logger: newLogger,
	})
	if err != nil {
		panic(fmt.Sprintf("failed to connect database: %v", err))
	}

	// 自动迁移数据库表
	err = DB.AutoMigrate(
		&models.User{},
		&models.Admin{},
		&models.Stock{},
		&models.Trade{},
		&models.Sender{},
		&models.Receiver{},
	)
	if err != nil {
		panic(fmt.Sprintf("failed to migrate database: %v", err))
	}
}
