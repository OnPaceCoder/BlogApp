const express = require("express");
const multer = require("multer")
const uploadMiddleware = multer({ dest: 'uploads/' })
const { get } = require("mongoose");
const { createPost, updatePost, getPost, getPostById } = require("../controllers/post.controller");
const router = express.Router();

router.post("/", uploadMiddleware.single('file'), createPost)
router.put("/", uploadMiddleware.single('file'), updatePost)
router.get("/", getPost)
router.get("/:id", getPostById)

module.exports = router