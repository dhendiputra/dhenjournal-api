const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const express = require("express");
const upload = require("./config/multer");
const path = require("path");
const feedRoutes = require("./routes/feed.routes");
require("dotenv").config();
const cors = require("cors");

const app = express();
const PORT = process.env.MONGOPORT;

// middleware
app.use(bodyParser.json());
app.use("/images", express.static("images"));
app.use(upload.single("image"));
app.use(cors());

// routes
app.use("/feed", feedRoutes);
app.use("/", (req, res) => {
  res.send("Hello World! Please check /feed");
});

// error handling
app.use((error, req, res, next) => {
  const status = error.errorStatus || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({
    message: message,
    data: data,
  });
});

// mongo connect
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Connection Success, running in port: ${PORT}`)
    );
  })
  .catch((err) => console.log(err));
