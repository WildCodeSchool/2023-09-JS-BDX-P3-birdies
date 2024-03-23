const fs = require("fs");

const AbstractManager = require("./AbstractManager");
// fs is used to rename a file (NodeJs native library ; fs = "file system")
// Allows to access to the server file system
class UploadManager extends AbstractManager {
  constructor() {
    super({ table: "upload" });
  }

  create(data) {
    const filename = `${data.destination}${data.filename}.${data.originalname
      .split(".")
      .slice(-1)}`;
    return new Promise((resolve, reject) => {
      fs.rename(data.path, filename, async (err) => {
        if (err) {
          reject(err);
        }
        const [result] = await this.database.query(
          `insert into ${this.table} (url) values (?)`,
          [filename.replace("public/", "")]
        );
        resolve({
          id: result.insertId,
          url: filename.replace("public/", ""),
        });
      });
    });
  }
}

module.exports = UploadManager;
