package main

import (
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
		CookieSecure:   false,          // Change to true in production with HTTPS
		CookieHTTPOnly: true,
		CookieSameSite: "Lax", // Allows cookies to be sent with requests
		CookieDomain:   "localhost",
	})

	routes.SetUp(app)
	app.Listen(":8080")
}
