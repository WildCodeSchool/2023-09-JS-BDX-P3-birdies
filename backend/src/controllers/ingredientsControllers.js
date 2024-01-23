const models = require("../models");

const getIngredients = (_, res) => {
  models.ingredient
    .findAll()
    .then(([response]) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

const findIngredient = (req, res) => {
  const { name } = req.params;
  models.ingredient
    .findByName(name)
    .then(([response]) => {
      const result = response[0];
      if (result !== null) {
        res.send({ id: result.id });
      } else {
        res.status(404).send({ id: 0 });
      }
    })
    .catch(() => {
      res.status(404).send({ id: 0 });
    });
};

const postIngredient = (req, res) => {
  models.ingredient
    .create(req.body)
    .then(([response]) => {
      res.send({ id: response.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).json({ error: err.message });
    });
};
module.exports = {
  getIngredients,
  findIngredient,
  postIngredient,
};
