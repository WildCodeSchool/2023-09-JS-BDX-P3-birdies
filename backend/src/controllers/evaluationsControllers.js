const models = require("../models");

const postEvaluation = (req, res) => {
  models.evaluation
    .create(req.body)
    .then(([result]) => {
      res.send({ id: result.insertId });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

const getByRecipe = (req, res) => {
  const { recipeId } = req.params;
  models.evaluation
    .findByRecipe(recipeId)
    .then(([result]) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};

module.exports = { postEvaluation, getByRecipe };
