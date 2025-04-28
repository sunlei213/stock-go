package models

import (
	"time"
)

type Trade struct {
	ID        int       `json:"id" gorm:"primaryKey"`
	UserID    int       `json:"user_id" gorm:"not null"`
	SendDay   string    `json:"send_day" gorm:"not null"`
	StartTime string    `json:"start_time" gorm:"not null"`
	StockCode string    `json:"stock_code" gorm:"not null"`
	StockName string    `json:"stock_name" gorm:"not null"`
	Type      string    `json:"type" gorm:"not null"`
	Price     float64   `json:"price" gorm:"not null"`
	Volume    int       `json:"volume" gorm:"not null"`
	No        int       `json:"no" gorm:"not null"`
	Price1    float64   `json:"price1" gorm:"not null"`
	Volume1   int       `json:"volume1" gorm:"not null"`
	ReturnVol int       `json:"return_vol" gorm:"not null"`
	Status    string    `json:"status" gorm:"not null"`
	Msg       string    `json:"msg"`
	Shorsz    string    `json:"shorsz"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

type Sender struct {
	ID         int       `json:"id" gorm:"primaryKey"`
	UserID     int       `json:"user_id" gorm:"not null"`
	MeetingDay string    `json:"meeting_day"`
	StartTime  string    `json:"start_time"`
	Code       string    `json:"code"`
	Shorsz     string    `json:"shorsz"`
	Price      float64   `json:"price"`
	Volume     int       `json:"volume"`
	Type       string    `json:"type"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}

type Receiver struct {
	ID         int       `json:"id" gorm:"primaryKey"`
	MeetingDay string    `json:"meeting_day"`
	StartTime  string    `json:"start_time"`
	Stg        string    `json:"stg"`
	Type       string    `json:"type"`
	Msg        string    `json:"msg"`
	CreatedAt  time.Time `json:"created_at"`
	UpdatedAt  time.Time `json:"updated_at"`
}
