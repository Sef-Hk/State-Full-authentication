package config

import (
	"time"

	"github.com/gofiber/fiber/v2/middleware/session"
)

// Global session store
var Store = session.New(session.Config{
	Expiration:     24 * time.Hour, // Session expires in 24 hours
	CookieSecure:   false,          // Set to true in production (HTTPS only)
	CookieHTTPOnly: true,
})
