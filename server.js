// requireing packages
require('dotenv').config()
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");
// port on local host and heroku deployment 
const PORT = process.env.PORT || 3030;
// create instance of express to use
const app = express();
// using morgan, compression, url encoding, and parsing json
app.use(logger("dev"));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// creating static access to public folder
app.use(express.static("public"));
// connecting to mongo locally and with heroku
mongoose.connect(process.env.MONGODB_URI ||process.env.Atlas_Connect, {
  useNewUrlParser: true,
  useFindAndModify: false
});

// routes folder reference to apis
app.use(require("./routes/api.js"));
// server listening
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});