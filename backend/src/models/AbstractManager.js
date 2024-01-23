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

  findAll(params = {}, dataValue = {}) {
    let query = `select * from  ${this.table}`;
    const values = [];
    console.info("findAll", params, query, values);
    console.info(Object.entries(params));

    for (const [key, value] of Object.entries(dataValue)) {
      query += `${values.length ? "," : ""} ${key} = ?`;

      values.push(value);
    }

    if (values?.length) {
      query += `WHERE ${dataValue} = ?`;
      values.push(dataValue);
    }

    return this.database.query(query, values);
  }

  // findAll(params = {}) {
  //   let query = `SELECT * FROM ${this.table}`;
  //   const values = [];
  //   const conditions = [];

  //   console.log("findAll", params, query, values);
  //   console.log(Object.entries(params));

  //   for (const [key, value] of Object.entries(params)) {
  //     conditions.push(`${key} = ?`);
  //     values.push(value);
  //   }

  //   if (conditions.length > 0) {
  //     query += ` WHERE ${conditions.join(" AND ")}`;
  //   }

  //   return this.database.query(query, values);
  // }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id = ?`, [id]);
  }

  setDatabase(database) {
    this.database = database;
  }
}
// Ready to export
module.exports = AbstractManager;
