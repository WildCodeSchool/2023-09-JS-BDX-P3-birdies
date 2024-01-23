const models = require("../models");

const postStep = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.step.create(req.body, id).then(([response]) => {
    res.send({ id: response.insertId, recipeId: id });
  });
};

const getStep = (req, res) => {
  const { id } = req.params;
  models.step
    .get(id)
    .then(([response]) => {
      if (response !== null) {
        res.json(response);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(420).send({ error: err.message });
    });
};
const deleteSteps = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.step
    .deleteAll(id)
    .then(([response]) => {
      if (response.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(204).send({ message: "Done" });
      }
    })
    .catch((error) => {
      res.status(500).send(error);
    });
};
module.exports = { postStep, getStep, deleteSteps };
