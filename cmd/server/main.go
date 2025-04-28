package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/sunleity/stock-go/internal/database"
)

func main() {
	// 初始化数据库
	database.InitDB()

	// 创建Gin引擎
	r := gin.Default()

	// 配置路由
	setupRoutes(r)

	// 获取端口号
	port := os.Getenv("PORT")
	if port == "" {
		port = "8001"
	}

	// 启动服务器
	log.Printf("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Server failed to start: %v", err)
	}
}

func setupRoutes(r *gin.Engine) {
	// 这里将添加具体的路由配置
	// TODO: 添加认证中间件和路由处理器
}
