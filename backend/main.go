package main

import (
	"log"
	"os"
	"time"

	"github.com/Sef-Hk/State-Full-authentication/backend/database"
	"github.com/Sef-Hk/State-Full-authentication/backend/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/gofiber/storage/redis" // ✅ Correct Redis storage for Fiber sessions
)

var Store *session.Store

func main() {
	database.Connect()
	app := fiber.New()

	app.Use(cors.New(cors.Config{
		AllowOrigins:     "https://state-full-authentication-olp8.vercel.app",
		AllowMethods:     "GET,POST,HEAD,PUT,DELETE,OPTIONS",
		AllowHeaders:     "Origin, Content-Type, Accept, Authorization",
		AllowCredentials: true,
	}))

	// ✅ Use Fiber's Redis storage
	redisStore := redis.New(redis.Config{
		// Host:     "allowed-goldfish-14767.upstash.io",
		// Port:     6379,
		// Password: "ATmvAAIjcDExYjVhNzQyZmQ2ZmI0OTVjOTBhMmRhN2IxYmJmNTkxNnAxMA",
		// Database: 0,
		URL: os.Getenv("REDIS_URL"),
	})

	// ✅ Use Redis as session storage
	Store = session.New(session.Config{
		Storage:        redisStore, // ✅ Correct way to use Redis for session storage
		Expiration:     24 * time.Hour,
		CookieSecure:   true,
		CookieHTTPOnly: true,
		CookieSameSite: "Lax",
		CookieDomain:   ".vercel.app",
	})

	routes.SetUp(app)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default for local dev
	}

	log.Printf("Server running on port %s", port)
	log.Fatal(app.Listen(":" + port))
}
