const homeRoute = require("express").Router(); 
const articleModel = require("../models/articleModel")


homeRoute.get("/:page", async (req, res)=> {

    const resPerPage = 9; // results per page
    const page = req.params.page || 1;

    
    const allBlogs = await articleModel.find();
    res.render("index", {blogs: allBlogs})
})

homeRoute.get('/signup', (req, res) => {
    res.render('signup.ejs')
})


homeRoute.get('/login', (req, res) => {
    res.render('login.ejs')
})

module.exports = homeRoute;