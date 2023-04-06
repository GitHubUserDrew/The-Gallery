const express = require("express");
const bcrypt = require("bcrypt");
const router = new express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) res.status(400).send("Username and Password required")
        const hash = await bcrypt.hash(password, 10);
        let foundUser = await User.findOne({ username });
        if (foundUser) return res.status(409).send("User already exists");
        const user = new User({ username, password: hash });
        await user.save();
        let token = jwt.sign({ username }, process.env.JWT_SECRET);
        res.cookie("auth", token);
        return res.status(201).send({ username });
    } catch (err) {
        return res.status(500).send('some error occured');
    }

})


router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) res.status(400).send("Username and Password required")
        let user = await User.findOne({ username });

        bcrypt.compare(password, user.password, async function (err, result) {

            // if(err)return res.status(500).send('some error occured')
            if (!result) return res.status(401).send("incorrect password")
            let token = jwt.sign({ username }, process.env.JWT_SECRET);
            res.cookie("auth", token);
            return res.status(201).send({ username });




        });
    } catch (err) {
        return res.status(500).send('some error occured');
    }
})


router.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.send('success');
})

router.get('/me', async (req, res) => {
    try{
        let auth = req.cookies.auth;
        let verified = jwt.verify(auth, process.env.JWT_SECRET);
        if (!verified) {
            res.clearCookie();
            return res.status(401).send("invalid token");
        }
        let user = await User.findOne({ username: verified.username });
        return res.status(200).send({ username: user.username });
    } catch (err) {
        return res.status(500).send('some error occured');
    }
})



module.exports = router;