//Importing libraries
const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cokkieParser = require("cookie-parser")
require('dotenv').config()

//Importing Database models
const User = require("./models/User")

//Creating Salt
const salt = bcrypt.genSaltSync(15);
const secret = process.env.SECRET
//Middleware 
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cokkieParser())


//Database Connection
mongoose.connect(`mongodb+srv://priyanksoftcolon:${process.env.PASSWORD}@cluster0.17c4qiy.mongodb.net/`)


//Routes and Controller

//register
app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username, password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc)
    } catch (error) {
        res.status(400).json(error)
    }

})

//login
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({ username });
        const passwordCheck = bcrypt.compareSync(password, userDoc.password)
        if (passwordCheck) {
            jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
                if (err) throw err

                res.cookie('token', token).json('Ok')
            })
        }
        else {
            res.status(400).json("Credentials Incorrect")
        }
    }
    catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
})

//Profile
app.get("/profile", async (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })
})



//Server listening on port:4000
app.listen(4000)