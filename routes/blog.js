const blogRouter = require("express").Router();

const blogController = require("../controllers/blog")

blogRouter.get("/compose", (req, res)=> {
    res.render("composeBlog")
})

blogRouter.get("/account", (req, res) => {
    res.render("signed_in_account")
})
blogRouter.get('/delete/:id', blogController.delete_blog)

blogRouter.get('/edit/:id', blogController.get_blog_to_update)

blogRouter.post('/edit/:id', blogController.edit_Blog)

blogRouter.post("/compose", blogController.createBlog)

blogRouter.get("/getall", blogController.get_all_blogs)

module.exports = blogRouter