const models = require("../models");

const getAllUserFavorites = async (req, res) => {
  const userId = parseInt(req.params.userId, 10);

  try {
    const [response] = await models.favoriteRecipes.findUserFavorites(userId);
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
    await models.favoriteRecipes[response.length ? "delete" : "post"](
      userId,
      recipeId
    );
    const [favoriteRecipes] = await models.favoriteRecipes.findAllFavorites(
      userId
    );
    return res.send(favoriteRecipes);
  } catch (err) {
    return res.status(500).send(err);
  }
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
