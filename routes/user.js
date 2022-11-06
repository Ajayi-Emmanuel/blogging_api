const express = require('express');
// const userController = require("../controllers/user")
const authRouter = express.Router();
const {createUser} = require("../controllers/user")

authRouter.post('/signup', createUser);

// authRouter.post('/login', userController.user_login);

module.exports = authRouter;