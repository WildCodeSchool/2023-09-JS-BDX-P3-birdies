const AbstractManager = require("./AbstractManager");

class StepManager extends AbstractManager {
  constructor() {
    super({ table: "steps" });
  }

  async create(steps, id) {
    return this.database.query(
      `insert into ${this.table} (recipe_id, description, position) values ?`,
      [steps.map((step) => [id, step.description, step.position])]
    );
  }
}

module.exports = StepManager;
