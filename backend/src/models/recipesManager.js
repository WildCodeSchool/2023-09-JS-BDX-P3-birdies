/* eslint-disable lines-between-class-members */
const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipes" });
  }

  async create(recipe) {
    return this.database.query(
      `insert into ${this.table} (userId, name, publicationDate, picture, peopleNumber, energyPerPerson, difficulty, prepTime) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.userId,
        recipe.name,
        recipe.publicationDate,
        recipe.picture,
        recipe.peopleNumber,
        recipe.energyPerPerson,
        recipe.difficulty ?? "",
        recipe.prepTime,
      ]
    );
  }
  async findByName(name) {
    return this.database.query(
      `SELECT * from ${this.table} WHERE name like"%${name}%" `
    );
  }
  async findByDifficult(difficult) {
    return this.database.query(
      `SELECT * from ${this.table} WHERE difficulty = ${difficult}`
    );
  }
}

module.exports = RecipeManager;
