const fs = require("fs");

const AbstractManager = require("./AbstractManager");
// fs sert a renomer un fichier (librairie native de NodeJS fs = "file system") permet d'acceder au systeme de fichiers du serveur
class UploadManager extends AbstractManager {
  constructor() {
    super({ table: "upload" });
  }

  create(data) {
    console.info(data);
    const filename = `${data.destination}${data.filename}.${data.originalname
      .split(".")
      .slice(-1)}`;
    // on utilise le path car dans le .path plutot que .destination il y a des \ qui sont necessaire si mac
    return new Promise((resolve, reject) => {
      fs.rename(data.path, filename, async (err) => {
        if (err) {
          reject(err);
        }
        const [result] = await this.database.query(
          `insert into ${this.table} (url) values (?)`,
          [filename.replace("public/", "")]
        );
        console.info(result);
        resolve({
          id: result.insertId,
          url: filename.replace("public/", ""),
        });
      });
    });
  }
}

module.exports = UploadManager;
