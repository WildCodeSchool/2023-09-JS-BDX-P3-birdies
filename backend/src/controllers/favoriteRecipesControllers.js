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
  // we declare a variable for the use id and the recipe id
  const userId = parseInt(req.params.userId, 10);
  const recipeId = parseInt(req.params.recipeId, 10);
  try {
    // we look for this recipe in the user favorites
    const [response] = await models.favoriteRecipes.find(userId, recipeId);
    // if we find something, we use the method to remove it
    // if we don't find anything we add it
    await models.favoriteRecipes[response.length ? "delete" : "post"](
      userId,
      recipeId
    );
    // then we get all the user favorite recipes
    const [favoriteRecipes] = await models.favoriteRecipes.findAllFavorites(
      userId
    );
    // we send it back to the app to update the heart shaped button in the recipes cards
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
