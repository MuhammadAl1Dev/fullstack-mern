const route = require("express").Router();
const newsRoute = require('./Routes/news/news.index');

route.use('/api', newsRoute);

module.exports = route;