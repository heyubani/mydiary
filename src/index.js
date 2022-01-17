const express = require('express')
const dotenv = require("dotenv");
const fileUpload = require('express-fileupload');
const config = require('./config/env');


const route = require("./router/index");
const db = require("./db");
const app = express();
const port = config.APP_PORT;

dotenv.config();
app.use(express.json())
app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => res.send('Hello World!rrrr'));

app.use(route);

app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const fileUpLoad = (req, res) => {
  if (!req.files) return res.status(400).send('No files were uploaded!');

  const { foo } = req.files;
  const uploadTo = `uploads/${foo.name}`;

  foo.mv(uploadTo, (err) => {
    if (err) return res.status(500).send(err);

    res.send(`File uploaded to <a href="${uploadTo}">${uploadTo}</a>`);
  });
};

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



  module.exports = fileUpLoad