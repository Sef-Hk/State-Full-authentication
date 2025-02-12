package controllers

import (
	// Assuming you have a database package

	"github.com/Sef-Hk/State-Full-authentication/backend/database"
	"github.com/Sef-Hk/State-Full-authentication/backend/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/session"
	"github.com/lib/pq"
	"golang.org/x/crypto/bcrypt"
)

var store = session.New() // Use session store

// func Register(c *fiber.Ctx) error {
// 	// First parse into a generic map to debug issues
// 	// var data map[string]interface{}
// 	// if err := c.BodyParser(&data); err != nil {
// 	// 	return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 	// 		"error":   "Invalid request data",
// 	// 		"details": err.Error(),
// 	// 	})
// 	// }

// 	// Parse into User struct
// 	var user models.User
// 	if err := c.BodyParser(&user); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"error":   "Invalid user structure",
// 			"details": err.Error(),
// 		})
// 	}

// 	// Hash password before storing
// 	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
// 	if err != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error": "Could not process password",
// 		})
// 	}
// 	user.Password = hashedPassword // Store hashed password as []byte

// 	// Insert user into the database
// 	result := database.DB.Create(&user)
// 	if result.Error != nil {
// 		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 			"error":   "Failed to register user",
// 			"details": result.Error.Error(),
// 		})
// 	}

// 	// Exclude password from the response (sanitize the response)
// 	user.Password = nil // Set password to nil to avoid sending it back in the response

// 	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
// 		"message": "User registered successfully",
// 		"user":    user,
// 	})
// }

// // var store = session.New() // In-memory session store for simplicity

// // Login function
// func Login(c *fiber.Ctx) error {
// 	// Parse the request body to get login data
// 	var data map[string]string

// 	// Parse the request body into loginData
// 	if err := c.BodyParser(&data); err != nil {
// 		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
// 			"error":   "Invalid request data",
// 			"details": err.Error(),
// 		})
// 	}
// 	// Find the user by email in the database
// 	var user models.User
// 	if err := database.DB.Where("email = ?", data["email"]).First(&user).Error; err != nil {
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 			"error": "Invalid credentials email",
// 		})
// 	}
// 	fmt.Println("Stored password hash: ", user.Password)
// 	fmt.Println("Entered password: ", data["password"])
// 	// Check if the password matches the hashed password stored in the database
// 	err := bcrypt.CompareHashAndPassword(user.Password, []byte(data["password"]))
// 	if err != nil {
// 		fmt.Println("Password comparison error:", err) // Log the specific error
// 		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
// 			"error": "Invalid credentials password",
// 		})
// 	}

// 	// // Create a session after successful login
// 	// session, err := store.Get(c)
// 	// if err != nil {
// 	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 	// 		"error": "Could not create session",
// 	// 	})
// 	// }

// 	// // Store user ID in the session
// 	// session.Set("user_id", user.ID)
// 	// if err := session.Save(); err != nil {
// 	// 	return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
// 	// 		"error": "Failed to save session",
// 	// 	})
// 	// }

// 	// Return success response with user info (except password)
// 	return c.Status(fiber.StatusOK).JSON(fiber.Map{
// 		"message": "Login successful",
// 		"user": fiber.Map{
// 			"id":        user.ID,
// 			"email":     user.Email,
// 			"full_name": user.FullName,
// 			"phone":     user.PhoneNumber,
// 		},
// 	})
// }
// ==================================FFFFFFOOOOOOOOOOOOOOOO====================================================

func Register(c *fiber.Ctx) error {
	// Create a struct for parsing user input separately
	type RegisterInput struct {
		FullName    string         `json:"full_name"`
		Email       string         `json:"email"`
		Password    string         `json:"password"` // Accept password as a string in JSON
		PhoneNumber string         `json:"phone_number"`
		DateOfBirth string         `json:"date_of_birth"`
		City        string         `json:"city"`
		Country     string         `json:"country"`
		Role        string         `json:"role"`
		Skills      pq.StringArray `json:"skills"`
	}

	var input RegisterInput

	// Parse request body into the temporary struct
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error":   "Invalid user structure",
			"details": err.Error(),
		})
	}

	// Check if email already exists
	var existingUser models.User
	if err := database.DB.Where("email = ?", input.Email).First(&existingUser).Error; err == nil {
		return c.Status(fiber.StatusConflict).JSON(fiber.Map{
			"error": "Email already in use",
		})
	}

	// Hash password
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(input.Password), bcrypt.DefaultCost)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not process password",
		})
	}

	// Create the user with the hashed password
	user := models.User{
		FullName:    input.FullName,
		Email:       input.Email,
		Password:    hashedPassword, // Store as []byte
		PhoneNumber: input.PhoneNumber,
		DateOfBirth: input.DateOfBirth,
		City:        input.City,
		Country:     input.Country,
		Role:        input.Role,
		Skills:      input.Skills,
	}

	// Insert into the database
	result := database.DB.Create(&user)
	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error":   "Failed to register user",
			"details": result.Error.Error(),
		})
	}

	// Remove password before sending response
	user.Password = nil

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"message": "User registered successfully",
		"user":    user,
	})
}

func Login(c *fiber.Ctx) error {
	// Request body struct
	type LoginInput struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	var input LoginInput

	// Parse request body
	if err := c.BodyParser(&input); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid request format",
		})
	}

	// Find user by email
	var user models.User
	if err := database.DB.Where("email = ?", input.Email).First(&user).Error; err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid email or password",
		})
	}

	// Compare stored password hash with provided password
	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(input.Password)); err != nil {
		return c.Status(fiber.StatusUnauthorized).JSON(fiber.Map{
			"error": "Invalid email or password",
		})
	}

	// Create session
	sess, err := store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not create session",
		})
	}

	// Store user ID in session
	sess.Set("user_id", user.ID)
	sess.Set("user_role", user.Role) // Optional: Store user role for authorization
	if err := sess.Save(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not save session",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Login successful",
		"user": fiber.Map{
			"id":       user.ID,
			"fullName": user.FullName,
			"email":    user.Email,
			"role":     user.Role,
		},
	})
}

func Logout(c *fiber.Ctx) error {
	sess, err := store.Get(c)
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not retrieve session",
		})
	}

	// Destroy session
	if err := sess.Destroy(); err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": "Could not log out",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Logout successful",
	})
}
