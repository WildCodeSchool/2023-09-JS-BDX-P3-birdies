const bcrypt = require("bcrypt");
const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "users" });
  }

  async create(user) {
    const hash = await UserManager.hashPassword(user.password);
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, pseudo, email, password, role) values (?, ?, ?, ?, ?, ?)`,
      [user.firstname, user.lastname, user.pseudo, user.email, hash, user.role]
    );
  }

  async login({ email, password }) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email like ?`,
      [email]
    );

    if (!rows.length) {
      return undefined;
    }

    const user = rows[0];
    console.info(user);
    const result = await bcrypt.compare(password, user.password);

    return result ? user : undefined;
  }

  getProfile(id) {
    return this.database.query(
      `SELECT id, email, pseudo, role FROM ${this.table} WHERE id=?`,
      [id]
    );
  }

  static hashPassword(password, workFactor = 5) {
    return bcrypt.hash(password, workFactor);
  }
}
module.exports = UserManager;
