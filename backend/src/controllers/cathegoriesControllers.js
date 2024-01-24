const models = require("../models");

const getCathegories = async (_, res) => {
  try {
    const [result] = await models.cathegories.findAll();
    return res.send(result);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

module.exports = { getCathegories };
