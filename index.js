require('dotenv').config();
const client = require("./app/database");

const express = require('express');
const router = require('./app/router');
const cors = require('cors');
const multer = require('multer');
const bodyParser = multer();
const port = process.env.PORT;
const app = express();

app.use(cors({
   origin: '*',
}));
app.use(bodyParser.none());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});