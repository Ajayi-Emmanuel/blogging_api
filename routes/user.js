const express = require('express');
const userController = require("../controllers/user")
const authRouter = express.Router();
// const  = require("../controllers/user")

authRouter.post('/signup', userController.createUser);

authRouter.post('/login', userController.user_login);

module.exports = authRouter;