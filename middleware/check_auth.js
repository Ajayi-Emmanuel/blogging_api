const {verify} = require("jsonwebtoken")
require("dotenv").config()

const verifyToken = (req, res, next) => {
    const accessToken = req.cookies['user-token']

    if(!accessToken) 
        return res.status(400).json({error: "User not Authenticated"})

    try{
        const validToken = verify(accessToken, process.env.JWT_SECRET)
        if(!validToken){
            req.authenticated = true
            return next()
        }
    }catch(err){
        return res.status(400).json({error: err})
    }
}



module.exports = {verifyToken}