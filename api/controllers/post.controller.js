const jwt = require("jsonwebtoken")
const fs = require('fs')
const Post = require("../models/Post")
const secret = process.env.SECRET

const createPost = async (req, res) => {
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
}

const updatePost = async (req, res) => {
    let newPath = null;
    if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1];
        newPath = path + "." + ext;
        fs.renameSync(path, newPath)
    }
    const { token } = req.cookies
    jwt.verify(token, secret, {}, async (err, info) => {
        if (err) throw err;
        const { id, title, summary, content } = req.body;
        console.log
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id);
        if (!isAuthor) {
            return res.status(400).json('you are not the author');
        }

        await Post.findOneAndUpdate({ _id: id }, { title, summary, content, cover: newPath ? newPath : postDoc.cover }, { new: true }).then(updatedUser => res.status(200).json({ updatedUser })).catch(error => res.status(400).json({ 'Error': error }))

    })

}
const getPost = async (req, res) => [
    res.json(await Post.find().populate('author', ['username']).sort({ createdAt: -1 }).limit(10))

]
const getPostById = async (req, res) => {
    const { id } = req.params;

    const postDoc = await Post.findById(id).populate('author', ['username']);
    res.json(postDoc)
}

module.exports = { createPost, updatePost, getPost, getPostById }