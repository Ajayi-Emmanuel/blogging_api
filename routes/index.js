const homeRoute = require("express").Router(); 
const articleModel = require("../models/articleModel")


homeRoute.get("/", async (req, res)=> {

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