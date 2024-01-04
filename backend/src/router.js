const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const itemControllers = require("./controllers/itemControllers");
// Route to get a list of items
router.get("/items", itemControllers.browse);

// Route to get a specific item by ID
router.get("/items/:id", itemControllers.read);

// Route to add a new item
router.post("/items", itemControllers.add);

/* ************************************************************************* */
// import UserControllers module for handling user-related operations
const userControllers = require("./controllers/userControllers");

router.get("/users", userControllers.getUsers);
router.post("/users", userControllers.postUser);
router.post("/login", userControllers.postLogin);

module.exports = router;
