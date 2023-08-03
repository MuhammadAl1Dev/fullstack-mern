const route = require("express").Router();
const {
  newsCtr,
  newsGetCtr,
  newsGetImgCtr,
  newsGetUzCtr,
  newsGetJahonCtr,
  newsGetFanTexnikaCtr,
  newsGetSportCtr,
  newsGetOneCtr,
  newsPutCtr,
  newsDeleteCtr,
  newsGetSearchCtr
} = require("./news.ctr");
const expressformidable = require("express-formidable");

// get
route.get("/news-list", newsGetCtr);
// get Uzb
route.get("/news-list/uzb", newsGetUzCtr);
// get jahon
route.get("/news-list/jahon", newsGetJahonCtr);
// get fan-texnika
route.get("/news-list/fan-texnika", newsGetFanTexnikaCtr);
// get sport
route.get("/news-list/sport", newsGetSportCtr);
// get One News
route.get("/news-list/:news_id", newsGetOneCtr);
// search
route.get("/news-search", newsGetSearchCtr);
// get Img
route.get("/news-img/:img_id", newsGetImgCtr);
// post
route.post("/news-post", expressformidable(), newsCtr);
// put
route.put('/news-put/:news_id', expressformidable(), newsPutCtr);
// delete
route.delete('/news-delete/:news_id', newsDeleteCtr);

module.exports = route;
