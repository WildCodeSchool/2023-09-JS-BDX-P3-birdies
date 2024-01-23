const models = require("../models");

const postrecipeIngredient = (req, res) => {
  const recipeId = parseInt(req.params.recipeId, 10);
  const ingredientId = parseInt(req.params.ingredientId, 10);
  //   res.send({ recipeId, ingredientId, body: req.body });
  models.recipesIngredients
    .create(req.body, recipeId, ingredientId)
    .then(([response]) => {
      res.send({ response });
    })
    .catch((err) => {
      console.info(err);
      res.status(500).send({ error: err.message });
    });
};

const getRecipeIngredient = (req, res) => {
  const { id } = req.params;
  //   res.send({ id });
  models.recipesIngredients
    .getIngredient(id)
    .then(([response]) => {
      if (response !== null) {
        res.json(response);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(404).send({ error: err.message });
    });
};
module.exports = { postrecipeIngredient, getRecipeIngredient };
