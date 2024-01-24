// const { parse } = require("dotenv");
const models = require("../models");

const getList = async (_, res) => {
  try {
    const [result] = await models.upload.findAll();
    return res.send(result);
  } catch (err) {
    return res.status(400).send({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const result = await models.upload.create(req.file);
    await models.recipe.addPicture(req.params.id, result.id);
    res.status(201).send(result);
  } catch (err) {
    console.info(err);
    res.status(400).send({ error: err.message });
  }
};

const createAvatar = async (req, res) => {
  try {
    const result = await models.upload.create(req.file);
    await models.user.addAvatar(req.params.id, result.id);
    res.status(201).send(result);
  } catch (err) {
    console.info(err);
    res.status(400).send({ error: err.message });
  }
};

const getRecipeImage = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const [result] = await models.upload.find(id);
    if (result[0] !== null) {
      res.status(201).send(result[0]);
    } else {
      res.status(404).send("image inexistante");
    }
  } catch (err) {
    console.info(err);
    res.status(400).send({ error: err.message });
  }
};
module.exports = { getList, create, getRecipeImage, createAvatar };
