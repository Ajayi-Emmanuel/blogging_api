
const { Cookie } = require("express-session")
const { userInfo } = require("os")
const articleModel = require("../models/articleModel")
const {readCounter} = require("./counter");

exports.get_all_blogs = async (req, res)=> {

    try {
        // const page = parseInt(req.query.page) -1||0; 
        // const limit = parseInt(req.query.limit) || 5;
        // const search = req.query.search || "";
        // let sort = req.query.sort || "createdAt";

        // let sortBy = {};
        // if(sort[1]) {
        //     sortBy[sort[0]] = sort[1];
        // }else{
        //     sortBy[sort[0]] = "asc";
        // }
        // const blogs = await articleModel.find({title: {$regex: search, $options: "i"}})
        // .sort(sortBy)
        // .skip(page * limit)
        // .limit(limit)

        // const res = {
        //     error: false,
        //     total,
        //     page: page + 1,
        //     limit,
        //     blogs
        // }
        loggedIn = req.authenticated
        const allBlogs = await articleModel.find()
            return res.render('index.ejs', {
                loggedIn,
                blogs: allBlogs
            })
        // res.status(200).json(res);

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"})
    }
    


}  

exports.createBlog = async (req, res) => {
    const {title, description, body} = req.body;

    if(!title || !body){
        return res.send("Enter details completely")
    }

    const readingTime = body.split(" ").length / 200;

    const blog = await articleModel.create({
        title,
        description,
        body,
        readingTime
    })
    // return res.redirect('/blogapi/blog/getall')
    
}


exports.get_blog_to_update = async (req, res) => {
    const {id} = req.params;

    const getData = await articleModel.findOne({_id: id});
    res.render("editBlog", {blog: getData})
}

exports.edit_Blog = (req, res) => {

    const {id} = req.params;
    const {title, description, body} = req.body 

    const updatedBlog = articleModel.updateOne({_id: id}, {title, description, body})

    .then((updatedBlog) => {
        console.log("Update Successfully")
        res.status(200).redirect("/blogapi/blog/getall") 
    }).catch((err) => {
            console.log(err)
            console.log("Error in updating database")
    })
    
}

exports.delete_blog = async (req, res) => {
    const {id} = req.params;

    const deleteBlog = await articleModel.deleteOne({_id: id});

    return res.redirect('/blogapi/blog/getall')
}

