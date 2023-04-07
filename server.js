const express = require("express");
const mongoose = require("mongoose")
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser")
mongoose.set("debug", true);
app.use(express.json({limit:"50mb"}))
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser())
const authRouter = require("./auth/auth")
mongoose.connect(process.env.MONGODB_URI)
app.use(express.static(__dirname+ '/client/build'));
app.get("/", (req, res)=> res.sendFile(__dirname +"/client/build/index.html"))
app.use("/auth", authRouter)

app.use(require('./middlewares/authenticate'));

app.use("/api", require('./api/api'))



const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log('server started ') })