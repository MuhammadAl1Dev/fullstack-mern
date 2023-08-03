const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const indexRoute = require('./src/index.Route');
const formidable = require('express-formidable');

// appuse
app.use(express.json());
mongoose.connect(process.env.MONGO_URL, console.log(process.env.MONGO_URL))
app.use(cors());
app.use(formidable());

app.use('/', indexRoute);

const PORT = 5000;
app.listen(PORT, () => {
    console.log('Server started');
})