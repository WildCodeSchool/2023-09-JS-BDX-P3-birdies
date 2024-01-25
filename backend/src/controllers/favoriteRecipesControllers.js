const models = require("../models");

const getAllUserFavorites = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  try {
    const [response] = await models.favoriteRecipes.findAllFavorites(userId);
    console.info(response);
    res.send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};
const getFavorite = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const recipeId = parseInt(req.params.recipeId, 10);
  try {
    const [response] = await models.favoriteRecipes.find(userId, recipeId);
    if (response.length !== 0) {
      const [answer] = await models.favoriteRecipes.delete(userId, recipeId);
      res.status(204).send(answer);
    } else {
      const [newAnswer] = await models.favoriteRecipes.post(userId, recipeId);
      res.status(200).send(newAnswer);
    }
    const [favoriteRecipes] = await models.favoriteRecipes.findAllFavorites(
      userId
    );
    console.info(favoriteRecipes);
    return favoriteRecipes;
  } catch (err) {
    res.status(500).send(err);
  }
  return null;
};

const postFavorite = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const recipeId = parseInt(req.params.recipeId, 10);
  const [response] = await models.favoriteRecipes.post(userId, recipeId);
  res.send(response);
  console.info(response);
};

const deleteFavorite = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const recipeId = parseInt(req.params.recipeId, 10);
  const [response] = await models.favoriteRecipes.delete(userId, recipeId);
  res.send(response);
  console.info(response);
};

module.exports = {
  getAllUserFavorites,
  getFavorite,
  postFavorite,
  deleteFavorite,
};
