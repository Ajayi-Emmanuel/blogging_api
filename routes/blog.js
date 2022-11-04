const blogRouter = require("express").Router();
const articleModel = require("../models/articleModel")

blogRouter.get('/:id', async (req, res) => {

    const {id} = req.params;
    const getBlog = await articleModel.findOne({_id: id});

    res.render("specificBlog", {blog: getBlog})


})

.get('/delete/:id', async (req, res) => {
    const {id} = req.params;

    const deleteBlog = await articleModel.deleteOne({_id: id});

    return res.redirect('/')
})

.get('/edit/:id', async (req, res) => {
    const {id} = req.params;

    const getData = await articleModel.findOne({_id: id});
    res.render("editBlog", {blog: getData})
})

.post('/edit/:id', (req, res) => {

    const {id} = req.params;
    const {title, description, body} = req.body 

    const updatedBlog = articleModel.updateOne({_id: id}, {title, description, body})

    .then((updatedBlog) => {
        console.log("Update Successfully")
        res.redirect("/") 
    }).catch((err) => {
            console.log(err)
            console.log("Error in updating database")
    })
    
})


module.exports = blogRouter