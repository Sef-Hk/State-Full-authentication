package routes

import (
	"github.com/Sef-Hk/State-Full-authentication/backend/controllers"
	"github.com/Sef-Hk/State-Full-authentication/backend/middleware"
	"github.com/gofiber/fiber/v2"
)

func SetUp(app *fiber.App) {

	app.Post("/register", controllers.Register)
	app.Post("/login", controllers.Login)
	app.Get("/profile", middleware.AuthRequired, controllers.GetProfile)
	app.Post("/logout", controllers.Logout)

}
