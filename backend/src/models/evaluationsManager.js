const AbstractManager = require("./AbstractManager");

class EvaluationManager extends AbstractManager {
  constructor() {
    super({ table: "evaluations" });
  }

  async create(evaluation) {
    return this.database.query(
      `insert into ${this.table} (user_id, recipe_id, comment, note, transformedDate) values (?, ?, ?, ?, ?)`,
      [
        evaluation.userId,
        evaluation.recipeId,
        evaluation.commentMessage,
        evaluation.commentNote,
        evaluation.commentDate,
      ]
    );
  }

  async findByRecipe(recipeId) {
    return this.database.query(
      `select * from ${this.table} where recipe_id = ?`,
      [recipeId]
    );
  }
}
module.exports = EvaluationManager;
