package models

import (
	"time"
)

type Stock struct {
	ID           int       `json:"id" gorm:"primaryKey"`
	UserID       int       `json:"user_id" gorm:"not null"`
	StockCode    string    `json:"stock_code" gorm:"not null"`
	StockName    string    `json:"stock_name" gorm:"not null"`
	Quantity     int       `json:"quantity" gorm:"not null"`
	UsedStock    int       `json:"used_stock" gorm:"not null"`
	Price        float64   `json:"price" gorm:"not null"`
	NowPrice     float64   `json:"now_price" gorm:"not null"`
	Loss         float64   `json:"loss" gorm:"not null"`
	LossPer      float64   `json:"loss_per" gorm:"not null"`
	LockQuantity int       `json:"lock_quantity" gorm:"not null"`
	BuyQuantity  int       `json:"buy_quantity" gorm:"not null"`
	SellQuantity int       `json:"sell_quantity" gorm:"not null"`
	CreatedAt    time.Time `json:"created_at"`
	UpdatedAt    time.Time `json:"updated_at"`
}
