const AbstractManager = require("./AbstractManager");

class CathegoriesManager extends AbstractManager {
  constructor() {
    super({ table: "cathegories" });
  }
}

module.exports = CathegoriesManager;
