const express = require('express');
const userController = require("../controllers/user")
const authRouter = express.Router();

authRouter.get('/signup', (req, res) => {
    res.render('signup.ejs')
})


authRouter.get('/auth/login', (req, res) => {
    res.render('login.ejs')
})

authRouter.post('/signup', userController.createUser);

authRouter.post('/auth/login', userController.user_login);

module.exports = authRouter;