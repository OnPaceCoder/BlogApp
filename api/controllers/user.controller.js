const jwt = require("jsonwebtoken")
const secret = process.env.SECRET;
const getProfile = async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secret, {}, (err, info) => {
            if (err) throw err
            res.json(info)
        })
    }
    else {
        res.status(200)
    }
}

module.exports = { getProfile }