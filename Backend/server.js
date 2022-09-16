const express = require('express');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");

const app = express();
const authRoute =require("./routes/auth")
const userRoute =require("./routes/users")
const postRoute =require("./routes/post")
const PORT = 9000;
const mongoose = require("mongoose")
require("dotenv").config();
mongoose.connect(process.env.MONGOURL)
  .then(() => {
  console.log("DB connecting")
  }) 
  .catch((err) => {
  console.log(err);
  })
app.use(
  cookieSession({
    name: "user",
    keys: [
      "password"
    ],
    maxAge: 24 * 60 * 60 * 1000,
    })
  )
app.use(cookieParser());
app.use(cors());
app.use(express.json())
app.use("/auth", authRoute)
app.use("/user", userRoute)
app.use("/post", postRoute)
app.listen(PORT, ()=> console.log(PORT,"server start"))