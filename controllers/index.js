const articleModel = require("../models/articleModel")

exports.get_all_blogs = async (req, res)=> {
    req.authenticated = false
    const loggedIn = req.authenticated
    
    const {page = 1, limit = 10} = req.query;
    const allBlogs = await articleModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit);
    res.status(200).render("index.ejs", {
        loggedIn,
        blogs: allBlogs
    })


}  

exports.view_blog = async (req, res) => {

    const {id} = req.params;
    const getBlog = await articleModel.findOne({_id: id});

    getBlog.readcount++;
    getBlog.save()
    
    res.render("specificBlog", {blog: getBlog})

}