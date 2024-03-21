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
    const result = await bcrypt.compare(password, user.password);

    return result ? user : undefined;
  }

  async getUserByEmail(email) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where email like ?`,
      [email]
    );

    if (!rows.length) {
      return undefined;
    }

    const user = rows[0];
    delete user.password;

    return user;
  }

  getProfileWithImage(id) {
    return this.database.query(
      `SELECT users.id, users.email, users.pseudo, users.firstname, users.lastname, users.role, upload.url as avatar
       FROM ${this.table} as users
       JOIN upload ON users.avatar = upload.id
       WHERE users.id = ?`,
      [id]
    );
  }

  getProfile(id) {
    return this.database.query(
      `SELECT id, email, pseudo, firstname, lastname, role, avatar FROM ${this.table} WHERE id = ?`,
      [id]
    );
  }

  static hashPassword(password, workFactor = 5) {
    return bcrypt.hash(password, workFactor);
  }

  async updateUser(id, user) {
    return this.database.query(
      `UPDATE ${this.table} SET pseudo = ?, firstname = ?, lastname = ?, email = ?, role = ? WHERE id = ?`,
      [user.pseudo, user.firstname, user.lastname, user.email, user.role, id]
    );
  }

  async updateUserRole(id, user) {
    return this.database.query(
      `UPDATE ${this.table} SET role = ? WHERE id = ?`,
      [user.role, id]
    );
  }

  async addAvatar(user, id) {
    return this.database.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [id, user]
    );
  }

  async getAllUsers() {
    return this.database.query(`SELECT * FROM ${this.table}`);
  }
}
module.exports = UserManager;
