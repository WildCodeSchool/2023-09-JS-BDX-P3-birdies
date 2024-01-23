// const { compareSync } = require("bcrypt");
const models = require("../models");

const getRecipes = (req, res) => {
  models.recipe
    .findAll(req.query)
    .then(([response]) => {
      res.status(200).send(response);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err.message });
    });
};

const getRecipesName = (req, res) => {
  const { name } = req.params;
  models.recipe.findByName(name).then(([result]) => {
    if (result !== null) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  });
};
const getRecipesDifficulty = (req, res) => {
  const { difficult } = req.params;
  models.recipe.findByDifficult(difficult).then(([result]) => {
    if (result !== null) {
      res.json(result);
    } else {
      res.sendStatus(404);
    }
  });
};
const getRecipeById = (req, res) => {
  const { id } = req.params;
  models.recipe
    .find(id)
    .then(([result]) => {
      if (result[0] !== null) {
        res.json(result[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.send({ error: err.message });
    });
};

const postRecipe = (req, res) => {
  models.recipe
    .create(req.body)
    .then(([response]) => {
      res.send({
        id: response.insertId,
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(422).send({ error: err.message });
    });
};
const updateRecipe = (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.info(typeof id);
  models.recipe
    .update(req.body, id)
    .then(([response]) => {
      if (response.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
const deleteRecipe = (req, res) => {
  const { id } = req.params;
  models.recipe
    .delete(id)
    .then(([response]) => {
      if (response.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send({ message: "Recipe deleted" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({ error: err.message });
    });
};

module.exports = {
  deleteRecipe,
  getRecipeById,
  getRecipes,
  getRecipesDifficulty,
  getRecipesName,
  postRecipe,
  updateRecipe,
};
