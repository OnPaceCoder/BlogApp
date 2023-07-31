//Importing libraries
const express = require("express")
const cors = require('cors')
const cookieParser = require("cookie-parser")
require('dotenv').config()
const { db } = require("./config/db")

//Routes and Controller
const authRoute = require("./routes/auth.routes.js")
const userRoute = require("./routes/user.routes.js")
const postRoute = require("./routes/post.routes.js")
//Importing Database models

//Database Connection
db();
const secret = process.env.SECRET
//Middleware 
const app = express()
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))
app.use(express.json())
app.use(cookieParser())
app.use('/uploads', express.static(__dirname + '/uploads'))
app.use('/api/auth', authRoute)
app.use('/api/profile', userRoute)
app.use('/post', postRoute);



//Server listening on port:4000
app.listen(4000)