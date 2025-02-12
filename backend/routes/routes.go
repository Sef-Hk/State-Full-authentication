package routes

import (
	"github.com/Sef-Hk/State-Full-authentication/backend/controllers"

	"github.com/gofiber/fiber/v2"
)

func SetUp(app *fiber.App) {

	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)

}
