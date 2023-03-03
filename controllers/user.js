const bcrypt = require('bcrypt')
const {createToken} =require("../middleware/check_auth")
const userModel = require("../models/userModel");
require('dotenv').config();


JWT_SECRET = process.env.JWT_SECRET

exports.createUser = async (req, res) => {
    const {firstname, lastname, username, email, password} = req.body;

    if(!username || username === "" || typeof username !== 'string'){
        res.render('signup.ejs', {
            error: "Invalid Username"
        }).status(403)
    }
    if(!firstname || firstname === "" || typeof firstname !== 'string'){
        res.render('signup.ejs', {
            error: "Invalid Firstname"
        }).status(403)
    }
    if(!lastname || lastname === "" || typeof lastname !== 'string'){
        res.render('signup.ejs', {
            error: "Invalid Lastname"
        }).status(403)
    }
    if(!email || email === "" || typeof email !== 'string'){
        res.render('signup.ejs', {
            error: "Invalid email"
        }).status(403)
    }
    if(!password || password === "" || typeof password !== 'string'){
        res.render('signup.ejs', {
            error: "Invalid Password"
        }).status(403)
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
            res.status(403)
            res.render('signup.ejs', {
                error: "Duplicate Username or Mail"
            })
        }else{
            res.render('signup.ejs', {
                error: err.code
            })
        }
    })
    
}

exports.user_login = async (req, res) => {
    
    const {username, password} = req.body

    if(!username || username === "" || typeof username !== 'string'){
        res.render('login.ejs', {
            error: "Invalid Username"
        })
    }

    if(!password || password === "" || typeof password !== 'string'){
        res.render('login.ejs', {
            error: "Invalid Password"
        })
    }

    const user = await userModel.findOne({username}).lean()
    if(!user){
        res.status(403)
        res.render('login.ejs', {
            error: "User not Found"
        })
    }else{

        if(await bcrypt.compare(password, user.password)){
            const accessToken = createToken(user)

            res.cookie("user-token", accessToken, 
            {
                maxAge: 60*60*1000,
                httpOnly: true,
            })
            req.authenticated = true;

            res.redirect("/blogapi/blog/getall")
        }else{
            res.status(403)
            res.render('login.ejs', {
                error: "Incorrect Username/Password"
            })
        }
    }
    
}
