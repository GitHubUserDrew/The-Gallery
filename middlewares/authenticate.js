const jwt = require("jsonwebtoken")
require('dotenv').config();

module.exports = (req, res, next) => {
    let auth = req.cookies.auth;

    if (!auth) {
        return res.status(401).json({ message: 'No token provided' });
    }

    let verified = jwt.verify(auth, process.env.JWT_SECRET);
    if (!verified) {
        res.clearCookie();
        return res.status(401).send("invalid token");
    }
    req.username = verified.username;
    return next();


}