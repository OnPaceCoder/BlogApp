const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()
const User = require("./models/User")
const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(`mongodb+srv://priyanksoftcolon:${process.env.PASSWORD}@cluster0.17c4qiy.mongodb.net/`)



app.post("/register", async (req, res) => {
    const { username, password } = req.body;
    const userDoc = await User.create({
        username, password
    });
    res.json(userDoc)
})




// mongodb+srv://priyanksoftcolon:<password>@cluster0.17c4qiy.mongodb.net/
app.listen(4000)