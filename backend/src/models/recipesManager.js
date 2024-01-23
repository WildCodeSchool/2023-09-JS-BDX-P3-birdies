/* eslint-disable lines-between-class-members */
const AbstractManager = require("./AbstractManager");

class RecipeManager extends AbstractManager {
  constructor() {
    super({ table: "recipes" });
  }

  async create(recipe) {
    return this.database.query(
      `insert into ${this.table} (userId, name, publicationDate, peopleNumber, energyPerPerson, difficulty, prepTime) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        recipe.userId,
        recipe.name,
        recipe.publicationDate,
        recipe.peopleNumber,
        recipe.energyPerPerson,
        recipe.difficulty ?? "non précisé",
        recipe.prepTime,
      ]
    );
  }
  async update(recipe, recipeId) {
    return this.database.query(
      `update ${this.table} set name= ?, peopleNumber= ?, energyPerPerson= ?, difficulty= ?, prepTime= ? where id= ?`,
      [
        recipe.name,
        recipe.peopleNumber,
        recipe.energyPerPerson,
        recipe.difficulty ?? "non précisé",
        recipe.prepTime,
        recipeId,
      ]
    );
  }

  async addPicture(recipeId, pictureId) {
    return this.database.query(
      `UPDATE ${this.table} SET picture = ? WHERE id = ?`,
      [pictureId, recipeId]
    );
  }

  async findByName(name) {
    return this.database.query(
      `SELECT * from ${this.table} WHERE name like"%${name}%" `
    );
  }
}

module.exports = RecipeManager;
