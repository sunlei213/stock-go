package models

import (
	"time"
)

type User struct {
	ID          int       `json:"id" gorm:"primaryKey"`
	Username    string    `json:"username" gorm:"unique;not null"`
	Balance     float64   `json:"balance" gorm:"default:0.0"`
	UsedMoney   float64   `json:"used_money" gorm:"default:0.0"`
	GetMoney    float64   `json:"get_money" gorm:"default:0.0"`
	StocksValue float64   `json:"stocks_value" gorm:"default:0.0"`
	TotalMoney  float64   `json:"total_money" gorm:"default:0.0"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

type Admin struct {
	ID        int       `json:"id" gorm:"primaryKey"`
	Username  string    `json:"username" gorm:"unique;not null"`
	Password  string    `json:"-" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}
