const AbstractManager = require("./AbstractManager");

class FavoriteRecipesManager extends AbstractManager {
  constructor() {
    super({ table: "favorite_recipes" });
  }

  async findAllFavorites(userId) {
    return this.database.query(
      `select * from ${this.table} where user_id = ?`,
      [userId]
    );
  }

  async find(userId, recipeId) {
    return this.database.query(
      `select * from ${this.table} where user_id = ? and recipe_id = ?`,
      [userId, recipeId]
    );
  }

  async post(userId, recipeId) {
    return this.database.query(
      `insert into ${this.table} (user_id, recipe_id) values (?, ?)`,
      [userId, recipeId]
    );
  }

  async delete(userId, recipeId) {
    return this.database.query(
      `delete from ${this.table} where user_id = ? and recipe_id = ?`,
      [userId, recipeId]
    );
  }
}

module.exports = FavoriteRecipesManager;
