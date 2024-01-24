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

  async create(ingredient) {
    return this.database.query(
      `insert into ${this.table} (ingredientName) values (?)`,
      [ingredient]
    );
  }
}

module.exports = IngredientManager;
