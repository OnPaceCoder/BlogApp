const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const salt = bcrypt.genSaltSync(15);
const secret = process.env.SECRET;

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userDoc = await User.create({
            username,
            password: bcrypt.hashSync(password, salt),
        });
        res.json(userDoc);
    } catch (error) {
        res.status(400).json(error);
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const userDoc = await User.findOne({ username });
        const passwordCheck = bcrypt.compareSync(password, userDoc.password);
        if (passwordCheck) {
            jwt.sign({ username, id: userDoc.id }, secret, {}, (err, token) => {
                if (err) throw err;

                res.cookie("token", token).json({ id: userDoc._id, username });
            });
        } else {
            res.status(400).json("Credentials Incorrect");
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};

const logout = async (req, res) => {
    res.cookie("token", "").json("Ok");
};

module.exports = { register, login, logout };
