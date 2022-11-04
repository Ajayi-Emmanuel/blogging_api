const express = require("express");
const passport = require("passport")
require("dotenv").config();
const db = require("./db");

db.connectToDb();

require('./Authentication/auth');
const homeRoute = require('./routes/index')
const authRouter = require('./routes/auth')
const blogRouter = require('./routes/blog')
const composeRoute = require('./routes/compose');


const PORT = process.env.PORT;
const app = express();

app.use(express.urlencoded({extended: true}))
app.use(express.static("public"));

app.use(express.json())
app.set('view engine', 'ejs')
app.use('/', homeRoute)
app.use('/blog', blogRouter)
app.use('/', authRouter)
app.use('/', composeRoute)
// app.use('/', passport.authenticate('jwt', { session: false }), composeRoute)                    




// Handle errors.
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}/`)
})