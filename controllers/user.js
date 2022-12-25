// // const passport = require('passport');
// // const jwt = require('jsonwebtoken');
// const userModel = require("../models/userModel");
// require('dotenv').config();

// exports.createUser = async (req, res) => {
//     const {firstname, lastname, email, password} = req.body;

//     const user = await userModel.create({
//         firstname, 
//         lastname, 
//         email, 
//         password
//     })
//     // res.redirect("/login")
//     .then((user) => {
//         res.json({
//             message: "User created",
//             user
//         }).status(200)
//         .redirect("/login");
//     }).catch((err) => {
//         console.log(err)
//         res.status(500);
//     })
    
// }

// exports.user_login = async (req, res, next) => {
//     passport.authenticate('login', async (err, user, info) => {
//         try {
//             if (err) {
//                 return next(err);
//             }
//             if (!user) {
//                 const error = new Error('Username or password is incorrect');
//                 return next(error);
//             }

//             req.login(user, { session: false }, async (error) => {
//                     if (error) return next(error);

//                     const body = { _id: user._id, email: user.email };
                    
//                     const token = jwt.sign({ user: body }, process.env.JWT_SECRET || "something_secret");

//                     return res.status(200).json({ token });
//                 }
//             );
//         } catch (error) {
//             return next(error);
//         }
//     })(req, res, next);
// }

// // module.exports = {createUser};