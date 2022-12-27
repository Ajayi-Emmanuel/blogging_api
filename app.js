const express = require("express");
// const passport = require("passport")
require("dotenv").config();
const {connectToDb} = require("./db");

//Connect to DataBase
connectToDb();

const app = express();
const PORT = process.env.PORT;


//Connect Routes
// require('./middleware/check_auth');
const homeRoute = require('./routes/index')
const authRouter = require('./routes/user')
// const blogRouter = require('./routes/blog')
// const composeRoute = require('./routes/compose');


app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.use(express.json())
app.set('view engine', 'ejs')
app.use('/blog', homeRoute)
// app.use('/blog', blogRouter)
app.use('/blog', authRouter)
// app.use('/', passport.authenticate('jwt', { session: false, failureRedirect: "/login" }), composeRoute)                    



app.use(function (err, req, res, next) {
    console.log(err);
    console.log(req.body)
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}/`)
})