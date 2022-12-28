
const articleModel = require("../models/articleModel")

exports.get_all_blogs = async (req, res)=> {

    const allBlogs = await articleModel.find()
    res.send(allBlogs)

}

exports.createBlog = async (req, res) => {
    const {title, description, body, author} = req.body;

    if(!title || !body){
        return res.send("Enter details completely")
    }

    const blog = await articleModel.create({
        title,
        description,
        body,
        author  
    })
    // return res.redirect('/')
    return res.send(blog)
    
}
// exports.view_blog = async (req, res) => {

//     const {id} = req.params;
//     const getBlog = await articleModel.findOne({_id: id});

//     res.render("specificBlog", {blog: getBlog})

// }

// exports.get_blog_to_update = async (req, res) => {
//     const {id} = req.params;

//     const getData = await articleModel.findOne({_id: id});
//     res.render("editBlog", {blog: getData})
// }

// exports.edit_Blog = (req, res) => {

//     const {id} = req.params;
//     const {title, description, body} = req.body 

//     const updatedBlog = articleModel.updateOne({_id: id}, {title, description, body})

//     .then((updatedBlog) => {
//         console.log("Update Successfully")
//         res.redirect("/") 
//     }).catch((err) => {
//             console.log(err)
//             console.log("Error in updating database")
//     })
    
// }

// exports.delete_blog = async (req, res) => {
//     const {id} = req.params;

//     const deleteBlog = await articleModel.deleteOne({_id: id});

//     return res.redirect('/')
// }

