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

  // findAll(dataValue = {}) {
  //   console.info(dataValue);
  //   let query = `select * from  ${this.table} `;
  //   const values = [];

  //   for (const [key, value] of Object.entries(dataValue)) {
  //     if (key === "name") {
  //       query += `${values.length ? " AND" : ""} name LIKE ?`;
  //       values.push(`${value}%`);
  //     } else {
  //       query += `${values.length ? "," : ""} ${key} = ?`;
  //       values.push(value);
  //     }
  //   }

  //   if (values?.length) {
  //     query += ` WHERE ${dataValue} = ?`;
  //     values.push(dataValue);
  //   }

  //   return this.database.query(query, values);
  // }

  findAll(dataValue = {}) {
    console.info(dataValue);
    let query = `select * from  ${this.table}`;
    const values = [];

    if (Object.entries(dataValue).length > 0) {
      query += " WHERE";
      for (const [key, value] of Object.entries(dataValue)) {
        // if (key === "name" || key === "difficulty" || key === "prepTime") {
        if (key !== "prepTime") {
          query += `${values.length ? " AND" : ""} ${key} LIKE ?`;
          values.push(`${value}%`);
        } else {
          query += `${values.length ? " AND" : ""} ${key} <= ?`;
          values.push(value === "" ? 525600 : `${value}`);
        }
        // }
      }
    }
    return this.database.query(query, values);

    //   for (const [key, value] of Object.entries(dataValue)) {
    //     if (key === "name" && key === "difficulty" && key === "prepTime") {
    //       if (key === "prepTime") {
    //         query += `${values.length ? " AND" : ""} ${key} < ?`;
    //         values.push(`${value}%`);
    //       } else {
    //         query += `${values.length ? " AND" : ""} name LIKE ?`;
    //         values.push(`${value}%`);
    //       }
    //     } else if (key === "name" && key === "difficulty") {
    //       query += `${values.length ? " AND" : ""} name LIKE ?`;
    //       values.push(`${value}%`);
    //     } else if (key === "name") {
    //       query += `${values.length ? " AND" : ""} name LIKE ?`;
    //       values.push(`${value}%`);
    //     } else if (key === "difficulty" && key.length > 0) {
    //       query += `${values.length ? " AND" : ""} difficulty LIKE ?`;
    //       values.push(`${value}%`);
    //     } else {
    //       query += `${values.length ? " AND" : ""} ${key} = ?`;
    //       values.push(value ?? "");
    //     }
    //   }
    // }

    // return this.database.query(query, values);
  }

  // for (const [key, value] of Object.entries(dataValue)) {
  //   if (key === "name" || key === "difficulty" || key === "prepTime") {
  //     if (key === "prepTime") {
  //       query += `${values.length ? " AND" : ""} ${key} < ?`;
  //       values.push(`${value}%`);
  //     } else {
  //       query += `${values.length ? " AND" : ""} ${key} LIKE ?`;
  //       values.push(`${value}%`);
  //     }
  //   }
  // }
  // return this.database.query(query, values);

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
