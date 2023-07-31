const mongoose = require("mongoose")


const db = () => {
    mongoose.connect(`mongodb+srv://priyanksoftcolon:${process.env.PASSWORD}@cluster0.17c4qiy.mongodb.net/`)
}

module.exports = { db };