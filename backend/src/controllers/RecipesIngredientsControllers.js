const models = require("../models");

const postrecipeIngredient = async (req, res) => {
  const recipeId = parseInt(req.params.recipeId, 10);
  const ingredientId = parseInt(req.params.ingredientId, 10);
  try {
    const [response] = await models.recipesIngredients.create(
      req.body,
      recipeId,
      ingredientId
    );
    return res.send(response);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const getRecipeIngredient = (req, res) => {
  const { id } = req.params;
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

const deleteRecipeIngredients = async (req, res) => {
  const id = parseInt(req.params.recipeId, 10);
  try {
    const response = await models.recipesIngredients.deleteAll(id);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
module.exports = {
  postrecipeIngredient,
  getRecipeIngredient,
  deleteRecipeIngredients,
};
