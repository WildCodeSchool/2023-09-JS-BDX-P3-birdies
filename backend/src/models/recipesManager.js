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
  async findById(id) {
    return this.database.query(
      `select *, upload.url from  ${this.table} left join upload on upload.id = recipes.picture where ${this.table}.id = ?`,
      [id]
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
  // a verifier
  async findLastRecipes(number) {
    return this.database.query(
      `SELECT recipes.id, recipes.name, upload.url from ${this.table} LEFT JOIN upload ON recipes.picture = upload.id ORDER BY id DESC limit ${number}`
    );
  }
  async findAllByUserId(userId) {
    return this.database.query(
      `SELECT * from ${this.table} WHERE userId = ${userId}`
    );
  }

  async findAllByUserEmail(email) {
    const [user] = await this.database.query(
      `SELECT * from users WHERE email = '${email}'`
    );
    return this.database.query(
      `SELECT * from ${this.table} LEFT JOIN upload ON recipes.picture = upload.id WHERE userId = ${user[0].id}`
    );
  }
}

module.exports = RecipeManager;
