const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipe" });
  }

  async create(recipe) {
    return this.database.query(
      `insert into ${this.table} (userId, name, date, picture, peopleNumber, energyPerPerson, difficulty, prepTime) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.userId,
        recipe.name,
        recipe.date,
        recipe.picture,
        recipe.peopleNumber,
        recipe.energyPerPerson,
        recipe.difficulty,
        recipe.prepTime,
      ]
    );
  }
}

module.exports = RecipeManager;
