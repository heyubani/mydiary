const express = require('express')
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');
const path = require('path')
const config = require('./config/env');


const route = require("./router/index");
const db = require("./db");
const app = express();
const port = config.APP_PORT;

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(fileUpload());

app.get('/', (req, res) => res.send('Hello World!rrrr'));

app.use(route);


// ERROR HANDLING
app.use((req, res) => {
  res.status(404).json({
    status: "Not Found",
  });
});
app.use((err, req, res, next) => {
  console.log(err);
  res.status(400).json({
    status: "Failed",
    message: err.message,
    
  });
});

db.connect()
  .then((obj) => {
    app.listen(port, () => {
      console.log(`Starting on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });