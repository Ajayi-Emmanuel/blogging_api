const express = require("express");
require("dotenv").config();
const db = require("./db");

const PORT = process.env.PORT;
const app = express();

app.use(express.json())

// db.connectToDb();

app.set('views', 'views')
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render("index")
})

app.get('/login', (req, res) => {
    res.render("login")
})

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.listen(PORT, () => {
    console.log(`Server running on https://localhost:${PORT}/`)
})