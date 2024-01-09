const AbstractManager = require("./AbstractManager");

class StepManager extends AbstractManager {
  constructor() {
    super({ table: "steps" });
  }

  async create(steps) {
    // console.info(`this is the id : ${id}`);
    return this.database.query(
      `insert into ${this.table} (recipe_id, description, position) values ?`,
      [steps.map((step) => [step.recipeId, step.description, step.position])]
    );
  }
}

module.exports = StepManager;
