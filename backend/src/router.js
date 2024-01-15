const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */
// import UserControllers module for handling user-related operations
const userControllers = require("./controllers/userControllers");
const recipeControllers = require("./controllers/recipesControllers");
const stepControllers = require("./controllers/stepControllers");
const ingredientControllers = require("./controllers/ingredientsControllers");
const evaluationControllers = require("./controllers/evaluationsControllers");
const { authMiddleware } = require("./middlewares/security/auth.middleware");

router.get("/users", userControllers.getUsers);
router.get("/users/:id([0-9]+)", userControllers.getUserById);
router.get("/users/me", authMiddleware, userControllers.getProfile);
router.post("/users", userControllers.postUser);
router.post("/login", userControllers.postLogin);
router.delete("/users/:id", userControllers.deleteUser);

router.get("/recipes", recipeControllers.getRecipes);
router.get("/recipes/:name(a-z)+", recipeControllers.getRecipesName);
router.get("/recipes/:id([0-9]+)", recipeControllers.getRecipeById);
router.post("/recipes", recipeControllers.postRecipe);
router.delete("/recipes", recipeControllers.deleteRecipe);

router.post("/recipes/:id([0-9]+)/steps", stepControllers.postStep);

router.get("/ingredients", ingredientControllers.getIngredients);
router.post("/ingredients", ingredientControllers.postIngredient);

router.post("/evaluations", evaluationControllers.postEvaluation);
router.get("/evaluations/:recipeId", evaluationControllers.getByRecipe);
module.exports = router;
