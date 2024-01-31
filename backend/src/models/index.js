require("dotenv").config();

const mysql = require("mysql2/promise");

// create a connection pool to the database

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
});
// try a connection

pool.getConnection().catch(() => {
  console.warn(
    "Warning:",
    "Failed to get a DB connection.",
    "Did you create a .env file with valid credentials?",
    "Routes using models won't work as intended"
  );
});

// declare and fill models: that's where you should register your own managers

const models = {};

// const ItemManager = require("./ItemManager");
const UserManager = require("./UserManager");
const RecipeManager = require("./recipesManager");
const StepManager = require("./stepsManager");
const IngredientManager = require("./ingredientsManager");
const RecipesIngredientsManager = require("./RecipesIngredientsManager");
const EvaluationManager = require("./evaluationsManager");
const UploadManager = require("./uploadManager");
const CathegoriesManager = require("./cathegoriesManager");
const RecipesCathegoriesManager = require("./recipeCathegoriesManager");
const FavoriteRecipesManager = require("./favoriteRecipesManager");
// models.item = new ItemManager();
// models.item.setDatabase(pool);

models.user = new UserManager();
models.user.setDatabase(pool);

models.recipe = new RecipeManager();
models.recipe.setDatabase(pool);

models.step = new StepManager();
models.step.setDatabase(pool);

models.ingredient = new IngredientManager();
models.ingredient.setDatabase(pool);

models.recipesIngredients = new RecipesIngredientsManager();
models.recipesIngredients.setDatabase(pool);

models.evaluation = new EvaluationManager();
models.evaluation.setDatabase(pool);

models.upload = new UploadManager();
models.upload.setDatabase(pool);

models.cathegories = new CathegoriesManager();
models.cathegories.setDatabase(pool);

models.recipeCathegories = new RecipesCathegoriesManager();
models.recipeCathegories.setDatabase(pool);
// bonus: use a proxy to personalize error message,
// when asking for a non existing model
models.favoriteRecipes = new FavoriteRecipesManager();
models.favoriteRecipes.setDatabase(pool);

const handler = {
  get(obj, prop) {
    if (prop in obj) {
      return obj[prop];
    }

    const pascalize = (string) =>
      string.slice(0, 1).toUpperCase() + string.slice(1);

    throw new ReferenceError(
      `models.${prop} is not defined. Did you create ${pascalize(
        prop
      )}Manager.js, and did you register it in backend/src/models/index.js?`
    );
  },
};

module.exports = new Proxy(models, handler);
