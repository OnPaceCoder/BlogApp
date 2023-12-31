const express = require('express')
const { register, login, logout } = require("../controllers/auth.controller")
const router = express.Router()

//@Feature - Register
//@Method - POST

router.post("/register", register);


router.post("/login", login);

router.post("/logout", logout)



module.exports = router;