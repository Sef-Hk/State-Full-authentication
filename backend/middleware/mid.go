package middleware

import (
	"time"

	"github.com/Sef-Hk/State-Full-authentication/backend/config"
	"github.com/gofiber/fiber/v2"
)

func AuthRequired(c *fiber.Ctx) error {
	sess, err := config.Store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized - No session found",
		})
	}

	userID := sess.Get("user_id")
	if userID == nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Unauthorized",
		})
	}

	lastActivity := sess.Get("last_activity")
	if lastActivity != nil {
		lastActivityTime, ok := lastActivity.(time.Time)
		if !ok {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
				"error": "Session timestamp error",
			})
		}

		// destroy the session after 30min
		if time.Since(lastActivityTime) > 30*time.Minute {
			_ = sess.Destroy()

			return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
				"error": "Session expired due to inactivity",
			})
		}
	}

	sess.Set("last_activity", time.Now())
	if err := sess.Save(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Failed to update session timestamp",
		})
	}

	return c.Next()
}
