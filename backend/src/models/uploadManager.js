const fs = require("fs");

const AbstractManager = require("./AbstractManager");
// fs sert a renomer un fichier (librairie native de NodeJS fs = "file system") permet d'acceder au systeme de fichiers du serveur
class UploadManager extends AbstractManager {
  constructor() {
    super({ table: "upload" });
  }

  create(data) {
    console.info(data);
    // data.destination et data.filename sont combinés pour créer data.originalname, split et slice pour enlever le suffixe ".jpg" ou autre
    const filename = `${data.destination}${data.filename}.${data.originalname
      .split(".")
      .slice(-1)}`;
    // on utilise le path car dans le .path plutot que .destination il y a des \ qui sont necessaire si mac
    // on fais une promesse pour gérer le temps d'exécution et rien bloquer
    return new Promise((resolve, reject) => {
      // fs.rename est une fonction node.js pour déplacer le fichier data.path dans filename
      // si erreur tout s'arrête
      fs.rename(data.path, filename, async (err) => {
        if (err) {
          reject(err);
        }
        // sinon requête sql pour insérer url dans upload et on enlève "public/" dans le filename
        const [result] = await this.database.query(
          `insert into ${this.table} (url) values (?)`,
          [filename.replace("public/", "")]
        );
        // on résout la promesse en insérant un id au hasard et filename dans la colonne url
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
