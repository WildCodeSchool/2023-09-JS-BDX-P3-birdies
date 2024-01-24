const express = require("express");
const multer = require("multer");
// multer sert à upload des images dans un dossier que l'on choisit avant le transfert vers la bdd (ici avec les autres images et assets dans public)
// c'est un midleware que l'on met dans notre route juste avant notre middleware controller
const upload = multer({ dest: "public/uploads/" });

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
const recipesIngredientsControllers = require("./controllers/RecipesIngredientsControllers");
const evaluationControllers = require("./controllers/evaluationsControllers");
const uploadControllers = require("./controllers/upload.controller");
const cathegoriesControllers = require("./controllers/cathegoriesControllers");
const { authMiddleware } = require("./middlewares/security/auth.middleware");

router.get("/users", userControllers.getUsers);
router.get("/users/:id([0-9]+)", userControllers.getUserById);
router.get("/users/me", authMiddleware, userControllers.getProfile);
router.post("/users", userControllers.postUser);
router.post("/login", userControllers.postLogin);
router.delete("/users/:id([0-9]+)", userControllers.deleteUser);
router.put("/users/:id([0-9]+)", userControllers.updateUser);

router.get("/recipes", recipeControllers.getRecipes);
router.get(
  "/recipes/:difficulty([a-z]+)",
  recipeControllers.getRecipesDifficulty
);
router.get("/recipes/:name([a-z]+)", recipeControllers.getRecipesName);
router.get("/recipes/:id([0-9]+)", recipeControllers.getRecipeById);
router.post("/recipes", recipeControllers.postRecipe);

router.put("/recipes/recipe/:id", recipeControllers.updateRecipe);
router.delete("/recipes", recipeControllers.deleteRecipe);

router.post("/recipes/:id([0-9]+)/steps", stepControllers.postStep);
router.get("/recipes/:id([0-9]+)/steps", stepControllers.getStep);
router.delete("/recipes/:id/steps", stepControllers.deleteSteps);

router.get("/ingredients", ingredientControllers.getIngredients);
router.get("/ingredients/:name", ingredientControllers.postIngredient);

router.get(
  "/recipesIngredients/:id",
  recipesIngredientsControllers.getRecipeIngredient
);
router.post(
  "/recipesIngredients/:recipeId/:ingredientId",
  recipesIngredientsControllers.postrecipeIngredient
);
router.delete(
  "/recipesIngredients/:recipeId",
  recipesIngredientsControllers.deleteRecipeIngredients
);
router.post("/evaluations", evaluationControllers.postEvaluation);
router.get("/evaluations/:recipeId", evaluationControllers.getByRecipe);

router.get("/uploads", uploadControllers.getList);
router.get("/uploads/:id", uploadControllers.getRecipeImage);
router.post(
  "/recipes/:id([0-9]+)/uploads",
  upload.single("picture"),
  uploadControllers.create
);

router.get("/cathegories", cathegoriesControllers.getCathegories);

module.exports = router;
