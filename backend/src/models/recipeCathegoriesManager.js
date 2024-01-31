const AbstractManager = require("./AbstractManager");

class RecipesCathegoriesManager extends AbstractManager {
  constructor() {
    super({ table: "recipes_cathegories" });
  }

  async create(id, cathegories) {
    return this.database.query(
      `insert into ${this.table} (recipe_id, cathegory_id) values ?`,
      [cathegories.map((cathegory) => [id, cathegory])]
    );
  }
}

module.exports = RecipesCathegoriesManager;
