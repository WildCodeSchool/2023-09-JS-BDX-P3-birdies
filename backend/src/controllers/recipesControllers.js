const models = require("../models");

const getRecipes = (_, res) => {
  models.recipe
    .findAll()
    .then(([response]) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err.message });
    });
};
const postRecipe = (req, res) => {
  models.recipe
    .create(req.body)
    .then(([response]) => {
      res.send({
        id: response.insertId,
        name: req.body.name,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

const deleteRecipe = (req, res) => {
  const { id } = req.body;
  models.recipe
    .delete(id)
    .then(([response]) => {
      if (response.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send({ message: "good" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err.message });
    });
};

module.exports = {
  getRecipes,
  postRecipe,
  deleteRecipe,
};
