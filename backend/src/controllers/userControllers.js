const jwt = require("jsonwebtoken");
const models = require("../models");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "1800s" });
}
const getUsers = (_, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const postUser = (req, res) => {
  models.user
    .create(req.body)
    .then(([rows]) => {
      res.send({
        id: rows.insertId,
        email: req.body.email,
        role: req.body.role,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

const postLogin = (req, res) => {
  models.user.login(req.body).then((user) => {
    if (user) {
      const token = generateAccessToken(user);
      res.send({ token });
    } else {
      res.status(401).send({ error: "identifiant incorrect !" });
    }
  });
};

module.exports = {
  getUsers,
  postUser,
  postLogin,
};
