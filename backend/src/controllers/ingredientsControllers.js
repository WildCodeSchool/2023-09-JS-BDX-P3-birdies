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
  postIngredient,
};
