class AbstractManager {
  constructor({ table }) {
    // Store the table name
    this.table = table;
  }

  find(id) {
    return this.database.query(`select * from  ${this.table} where id = ?`, [
      id,
    ]);
  }

  // trouve les recettes par critères

  findAll(dataValue = {}) {
    console.info(dataValue);
    let query = `select * from  ${this.table}`;
    const values = [];

    if (Object.entries(dataValue).length > 0) {
      query += " WHERE";
      for (const [key, value] of Object.entries(dataValue)) {
        if (key !== "prepTime") {
          query += `${values.length ? " AND" : ""} ${key} LIKE ?`;
          values.push(`${value}%`);
        } else {
          query += `${values.length ? " AND" : ""} ${key} < ?`;
          values.push(value === "" ? 525600 : `${value}`);
        }
        // }
      }
    }
    return this.database.query(query, values);
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}
// Ready to export
module.exports = AbstractManager;
