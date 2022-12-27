const express = require('express');
const userController = require("../controllers/user")
const authRouter = express.Router();

authRouter.post('/signup', userController.createUser);

authRouter.post('/auth/login', userController.user_login);

module.exports = authRouter;