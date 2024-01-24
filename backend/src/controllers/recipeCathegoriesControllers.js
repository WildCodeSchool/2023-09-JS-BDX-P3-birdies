const models = require("../models");

const postRecipeCathegories = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.info(id);
  try {
    const response = await models.recipeCathegories.create(id, req.body);
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = { postRecipeCathegories };
