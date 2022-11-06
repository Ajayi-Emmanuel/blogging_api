const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../models/userModel');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: process.env.JWT_SECRET || "something_secret",
            jwtFromRequest: ExtractJWT.fromUrlQueryParameter('secret_token')
            
        },
        async (token, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                done(error);
                
            }
        }
    )
);

// passport.use(
//     'signup',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'pasword', 

//             passReqToCallback: true
//         },
//         async (req, email, password, done) => {
//             // try{
//                 const firstName = req.body.firstName;
//                 const lastName = req.body.lastName;

//                 const user = await UserModel.create({
                    
//                     firstName,
//                     lastName,
//                     email,
//                     password,
//                 });
//                 return done(null, user);
//             // } catch (error) {
//             //     console.log(req.body)
//             //     done(error);
//             // }
//         }
//     ) 
// );

// passport.use(
//     '/login',
//     new localStrategy(
//         {
//             usernameField: 'email',
//             passwordField: 'password',
//             passReqToCallback: true
//         },
//         async (req, email, password, done) => {
//             // try {
//                 const user = await UserModel.findOne({ email });

//                 if (!user) {
//                     return done(null, false, { message: 'User not found' });
//                 }

//                 const validate = await user.isValidPassword(password);

//                 if (!validate) {
//                     return done(null, false, { message: 'Wrong Password' });
//                 }

//                 return done(null, user, { message: 'Logged in Successfully' });
//             // } catch (error) {
//             //     return done(error);
//             // }
//         }
//     )
// );