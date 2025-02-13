package config

import (
	"time"

	"github.com/gofiber/fiber/v2/middleware/session"
)

// Global session store (In-memory)
var Store = session.New(session.Config{
	Expiration:     24 * time.Hour,
	CookieSecure:   false,
	CookieHTTPOnly: true,
	CookieSameSite: "Lax",
	CookiePath:     "/",
})

func init() {
	// Register the time.Time type so that it can be stored in the session
	Store.RegisterType(time.Time{})
}
