const blogRouter = require("express").Router();
// const articleModel = require("../models/articleModel")

const blogController = require("../controllers/blog")

blogRouter.get('/:id', blogController.view_blog)

.get('/delete/:id', blogController.delete_blog)

.get('/edit/:id', blogController.get_blog_to_update)

.post('/edit/:id', blogController.edit_Blog)

.post("/compose", blogController.createBlog)

module.exports = blogRouter