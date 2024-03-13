const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const authRouter = require("./routes/UserAuthRoutes");

require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const PORT = process.env.PORT;

// server and db connection
mongoose
  .connect("mongodb://127.0.0.1:27017/user_management")
  .then((result) => {
    console.log("DB is connected");
    app.listen(PORT, () => {
      console.log("Server is running");
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

// routes
app.use(authRouter);
