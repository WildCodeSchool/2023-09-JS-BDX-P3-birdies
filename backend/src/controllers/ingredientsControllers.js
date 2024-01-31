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
  const { name } = req.params;
  models.ingredient
    .findByName(name)
    .then(([response]) => {
      const result = response[0];
      if (result) {
        res.status(200).send(result);
      } else {
        models.ingredient.create(name).then(([newResponse]) => {
          const results = newResponse[0];
          if (results !== null) {
            res.send({ id: newResponse.insertId });
          } else {
            res.sendStatus(404);
          }
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ error: err.message });
    });
};

module.exports = {
  getIngredients,
  postIngredient,
};
