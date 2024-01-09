const models = require("../models");

const postIngredient = (req, res) => {
  const id = parseInt(req.params.id, 10);
  models.step.create(req.body, id).then(([response]) => {
    res.send({ id: response.insertId });
  });
};

module.exports = { postIngredient };
