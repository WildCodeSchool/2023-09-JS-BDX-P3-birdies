const AbstractManager = require("./AbstractManager");

class IngredientManager extends AbstractManager {
  constructor() {
    super({ table: "ingredients" });
  }

  async findByName(name) {
    return this.database.query(
      `select * from ${this.table} where ingredientName = ?`,
      [name]
    );
  }

  async create(ingredients) {
    return this.database.query(
      `insert into ${this.table} (ingredientName) values ?`,
      [ingredients.map((ingredient) => [ingredient.name])]
    );
  }
}

module.exports = IngredientManager;
