//Importing libraries
const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const multer = require("multer")
const uploadMiddleware = multer({ dest: 'uploads/' })
const cookieParser = require("cookie-parser")
const fs = require('fs')
require('dotenv').config()

//Importing Database models
const User = require("./models/User")
const Post = require("./models/Post")
//Creating Salt
const salt = bcrypt.genSaltSync(15);
const secret = process.env.SECRET
//Middleware 
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())


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

                res.cookie('token', token).json({ id: userDoc._id, username })
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

//profile
app.get("/profile", async (req, res) => {
    const { token } = req.cookies;

    jwt.verify(token, secret, {}, (err, info) => {
        if (err) throw err
        res.json(info)
    })
})

//logout
app.post("/logout", (req, res) => {

    res.cookie('token', "").json("Ok")
})

//post

app.post('/post', uploadMiddleware.single('file'), async (req, res) => {

    const { originalname, path } = req.file;

    const parts = originalname.split('.')
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath)

    const { token } = req.cookies;
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err
        const { title, summary, content } = req.body;
        const postDoc = await Post.create({
            title,
            summary, content, cover: newPath,
            author: info.id
        })

        res.json(postDoc)
    })




})

//GET POST
app.get('/post', async (req, res) => {
    res.json(await Post.find().populate('author', ['username']).sort({ createdAt: -1 }))
})



//Server listening on port:4000
app.listen(4000)