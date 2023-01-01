const bcrypt = require('bcrypt')
const {createToken} =require("../middleware/check_auth")
const userModel = require("../models/userModel");
require('dotenv').config();


JWT_SECRET = process.env.JWT_SECRET

exports.createUser = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body;

    if(!username || username === "" || typeof username !== 'string'){
        return res.json({
            status: "error",
            'error-message': "Invalid Username"
        }).status(400)
    }
    if(!firstname || firstname === "" || typeof firstname !== 'string'){
        return res.json({
            status: "error",
            'error-message': "InValid firstname"
        }).status(400)
    }
    if(!lastname || lastname === "" || typeof lastname !== 'string'){
        return res.json({
            status: "error",
            'error-message': "Invalid lastname"
        }).status(400)
    }
    if(!email || email === "" || typeof email !== 'string'){
        return res.json({
            status: "error",
            'error-message': "Invalid email"
        }).status(400)
    }
    if(!password || password === "" || typeof password !== 'string'){
        return res.json({
            status: "error",
            'error-message': "Invalid Username"
        }).status(400)
    }

    const user = await userModel.create({
        firstname, 
        lastname, 
        username,
        email, 
        password
    }).then((user) => {
        res.status(200).redirect("/blogapi/auth/login")
    }).catch((err) => {
        if (err.code === 11000) {
            res.json({
                status: "error",
                'error message': "Duplicate Username or Email"
            })
            res.status(400)
        }
        throw err
    })
    
}

exports.user_login = async (req, res) => {
    
    const {username, password} = req.body

    if(!username || username === "" || typeof username !== 'string'){
        return res.json({
            status: "error",
            'error-message': "Invalid Username"
        }).status(400)
    }

    if(!password || password === "" || typeof password !== 'string'){
        return res.json({
            status: "error",
            'error-message': "Invalid password"
        }).status(400)
    }

    const user = await userModel.findOne({username}).lean()
    if(!user){
        return res.json({
            status: "error",
            'error-message': "User not Found"
        }).status(400)
    }
    if(await !bcrypt.compare(password, user.password)){
        return res.json({
            status: "error",
            'error-message': "Incorrect Username/Password"
        }).status(304)

    
    }
    const accessToken = createToken(user)

    res.cookie("user-token", accessToken, 
    {
        maxAge: 60*60*1000,
        httpOnly: true
    })
    res.redirect('/blogapi/blog/account')
}
