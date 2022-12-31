const homeRoute = require("express").Router(); 
const indexController = require("../controllers/index")

homeRoute.get("/", indexController.get_all_blogs)


module.exports = homeRoute;