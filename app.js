const express = require("express");
// const passport = require("passport")
require("dotenv").config();
const {connectToDb} = require("./db");
const cookieParser = require("cookie-parser")

//Connect to DataBase
connectToDb();

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(express.static("public"));


//Connect Routes
const {verifyToken} = require('./middleware/check_auth');
const homeRoute = require('./routes/index')
const authRouter = require('./routes/user')
const blogRouter = require('./routes/blog')


app.use(express.json())
app.set('view engine', 'ejs')
app.use('/blog', homeRoute)
app.use('/blogapi', authRouter)   
app.use('/blogapi/blog', verifyToken,  blogRouter)    
            



app.use(function (err, req, res, next) {
    console.log(err);
    console.log(req.body)
    res.status(err.status || 500);
    res.json({ error: err.message });
}); 


app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}/`)
})