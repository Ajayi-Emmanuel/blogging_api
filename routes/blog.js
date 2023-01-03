const blogRouter = require("express").Router();

const blogController = require("../controllers/blog")

blogRouter.get("/compose", (req, res)=> {
    res.render("composeBlog")
})

blogRouter.get('/delete/:id', blogController.delete_blog)

blogRouter.get('/edit/:id', blogController.get_blog_to_update)

blogRouter.post('/edit/:id', blogController.edit_Blog)

blogRouter.post("/compose", blogController.createBlog)


module.exports = blogRouter