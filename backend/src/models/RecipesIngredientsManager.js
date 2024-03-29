const AbstractManager = require("./AbstractManager");

class RecipesIngredientsManager extends AbstractManager {
  constructor() {
    super({ table: "recipes_ingredients" });
  }

  async create(ingredient, recipeId, ingredientId) {
    return this.database.query(
      `insert into ${this.table} (recipe_id, ingredient_id, unite, quantity) values (?, ?, ?, ?)`,
      [recipeId, ingredientId, ingredient.mesure, ingredient.quantity]
    );
  }

  async getIngredient(id) {
    return this.database.query(
      `select i.ingredientName, ri.unite, ri.quantity 
      from ${this.table} as ri
      join ingredients as i on i.id = ri.ingredient_id 
      where recipe_id = ?`,
      [id]
    );
  }

  async deleteAll(recipeId) {
    return this.database.query(
      `delete from ${this.table} where recipe_id = ?`,
      [recipeId]
    );
  }
}

module.exports = RecipesIngredientsManager;
