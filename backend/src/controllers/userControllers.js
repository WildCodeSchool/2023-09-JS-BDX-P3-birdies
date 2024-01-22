const jwt = require("jsonwebtoken");
const models = require("../models");

function generateAccessToken(data) {
  return jwt.sign(data, process.env.APP_SECRET, { expiresIn: "3600s" });
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
const getUserById = (req, res) => {
  const { id } = req.params;
  models.user
    .find(id)
    .then(([response]) => {
      if (response[0] !== null) {
        res.json(response[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send({ error: err.message });
    });
};

const getProfile = (req, res) => {
  res.send(req.user);
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
      const endOf = err.sqlMessage.split(" ").pop();
      console.error(endOf);
      res.status(422).send({ error: endOf });
    });
};

const postLogin = (req, res) => {
  models.user.login(req.body).then((user) => {
    if (user) {
      const { id, role, pseudo } = user;
      const token = generateAccessToken({
        id,
        role,
        pseudo,
        banana: "banana !",
      });
      res.send({ token });
    } else {
      res.status(401).send({ error: "identifiant incorrect !" });
    }
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  models.user
    .delete(id)
    .then(([response]) => {
      if (response.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send({ message: "User" });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const user = req.body;
  try {
    models.user.updateUser(id, user).then((response) => {
      if (response.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send({ message: "User modified" });
      }
    });
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getUsers,
  getUserById,
  getProfile,
  postUser,
  postLogin,
  deleteUser,
  updateUser,
};
