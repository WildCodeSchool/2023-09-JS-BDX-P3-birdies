const models = require("../models");

const postStep = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.step.create(req.body, id).then(([response]) => {
    res.send({ id: response.insertId });
  });
};

const getStep = (req, res) => {
  const { id } = req.params;
  models.step
    .get(id)
    .then(([response]) => {
      if (response[0] !== null) {
        res.json(response[0]);
      } else {
        res.sendStatus(404);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(420).send({ error: err.message });
    });
};
module.exports = { postStep, getStep };
