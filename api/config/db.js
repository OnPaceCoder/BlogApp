const mongoose = require("mongoose")


const db = async () => {
    try {
        const conn = await mongoose.connect(`mongodb+srv://priyanksoftcolon:${process.env.PASSWORD}@cluster0.17c4qiy.mongodb.net/`)

        console.error('DB connected ' + conn.connection.host)
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = { db };