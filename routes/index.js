const homeRoute = require("express").Router(); 
const indexController = require("../controllers/index")

homeRoute.get("/", indexController.get_all_blogs)

// homeRoute.get('/signup', (req, res) => {
//     res.render('signup.ejs')
// })


// homeRoute.get('/auth/login', (req, res) => {
//     res.render('login.ejs')
// })

module.exports = homeRoute;