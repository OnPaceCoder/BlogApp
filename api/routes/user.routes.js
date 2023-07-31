const express = require("express");
const { getProfile } = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getProfile)

module.exports = router