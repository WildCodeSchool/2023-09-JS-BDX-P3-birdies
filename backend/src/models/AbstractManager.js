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
    let query = `select recipes.id, recipes.name, upload.url from  ${this.table} LEFT JOIN upload ON recipes.picture = upload.id`;
    const values = [];

    if (Object.entries(dataValue).length > 0) {
      query += " WHERE";
      for (const [key, value] of Object.entries(dataValue)) {
        switch (key) {
          case "prepTime":
            if (value !== "") {
              query += `${values.length ? " AND" : ""} ${key} < ?`;
              values.push(`${value}`);
            }
            break;
          default:
            query += `${values.length ? " AND" : ""} ${key} LIKE ?`;
            values.push(`${value}%`);
            break;
        }
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
