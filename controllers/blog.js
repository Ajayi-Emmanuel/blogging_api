
const { Cookie } = require("express-session")
const articleModel = require("../models/articleModel")


exports.get_all_blogs = async (req, res)=> {

    try {
        loggedIn = req.authenticated
        username = req.user
        const allBlogs = await articleModel.find()
            return res.render('index.ejs', {
                loggedIn,
                username,
                blogs: allBlogs
            })

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
        author: req.user,
        readingTime
    })
    return res.redirect('/blogapi/blog/getall')
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

