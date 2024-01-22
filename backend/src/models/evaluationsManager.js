const AbstractManager = require("./AbstractManager");

class EvaluationManager extends AbstractManager {
  constructor() {
    super({ table: "evaluations" });
  }

  async create(evaluation) {
    return this.database.query(
      `insert into ${this.table} (user_id, recipe_id, comment, note, commentDate) values (?, ?, ?, ?, ?)`,
      [
        evaluation.userId,
        evaluation.recipeId,
        evaluation.commentMessage,
        evaluation.commentNote,
        evaluation.commentDate,
      ]
    );
  }
}
module.exports = EvaluationManager;
