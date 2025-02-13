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
	// Global session store
	Store = session.New(session.Config{
		Expiration:     24 * time.Hour, // Session lasts 1 day
		CookieSecure:   true,           // Change to true in production with HTTPS
		CookieHTTPOnly: true,
		CookieSameSite: "Lax", // Allows cookies to be sent with requests
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
