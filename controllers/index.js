const articleModel = require("../models/articleModel")

exports.get_all_blogs = async (req, res)=> {

    const {page = 1, limit = 20} = req.query;

    const allBlogs = await articleModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
    res.status(200).render("index", {blogs: allBlogs})

}