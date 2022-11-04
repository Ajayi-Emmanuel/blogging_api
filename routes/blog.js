const blogRouter = require("express").Router();
const articleModel = require("../models/articleModel")

blogRouter.get('/:id', async (req, res) => {

    const {id} = req.params;
    const getBlog = await articleModel.findOne({_id: id});

    res.render("specificBlog", {blog: getBlog})


})


module.exports = blogRouter