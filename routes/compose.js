const mongoose = require("mongoose")
const composeRouter = require("express").Router();
const articleModel = require("../models/articleModel")


composeRouter.get("/compose", (req, res)=> {

    res.render("composeBlog")
})

.post("/compose", async (req, res) => {
    const {title, description, body} = req.body;

    if(!title || !body){
        return res.send("Enter details completely")
    }

    const blog = await articleModel.create({
        title,
        description,
        body,
        state: "published",
        timeStamps: Date.now()
    })
    return res.redirect('/')


    
})
module.exports = composeRouter;