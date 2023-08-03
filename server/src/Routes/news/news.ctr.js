const fs = require("fs");
const postModel = require("../../Models/postModel");

// get
async function newsGetCtr(req, res) {
  try {
    let news = await postModel.find({}).select("-news_img");
    res.json(news);
  } catch (error) {
    console.log(error);
  }
}

// get One news
async function newsGetOneCtr(req, res) {
  const { news_id } = req.params;
  try {
    let data = await postModel.find({_id: news_id}).select('-news_img');
    res.json(data); 
  } catch (error) {
    console.log(error);
  }
}

// get Uzb
async function newsGetUzCtr(req, res) {
  try {
    let data = await postModel
      .find({ news_type: "ozbekiston" })
      .select("-news_img");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

// get jahon
async function newsGetJahonCtr(req, res) {
  try {
    let data = await postModel.find({ news_type: "jahon" }).select("-news_img");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

// get fan-texnika
async function newsGetFanTexnikaCtr(req, res) {
  try {
    let data = await postModel
      .find({ news_type: "fantexnika" })
      .select("-news_img");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

// get sport
async function newsGetSportCtr(req, res) {
  try {
    let data = await postModel.find({ news_type: "sport" }).select("-news_img");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

// get Img
async function newsGetImgCtr(req, res) {
  try {
    const { img_id } = req.params;
    let data = await postModel.findOne({ _id: img_id }).select("news_img");

    res.set("Content-Type", data.news_img.contentType);
    return res.send(data.news_img.data);
  } catch (error) {
    console.log(error);
  }
}

// get searh
async function newsGetSearchCtr(req, res){
  // res.send(news_title);
  try {
    const { news_title } = req.fields;
    let data = await postModel.find({news_title: news_title}).select('-news_img');
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
  }
}

// post
async function newsCtr(req, res) {
  const { news_title, news_about, news_desc, news_type } = req.fields;
  const { news_img } = req.files;
  if(!news_title || !news_about || !news_desc || !news_type || !news_img){
    return res.json({error: "Xatolik listlarni to'ldiring!"})
  }
  try {
    let data = await postModel.create({
      ...req.fields,
    });
    if (news_img) {
      data.news_img.data = fs.readFileSync(news_img.path);
      data.news_img.contentType = news_img.type;
    }
    data.save();
    res.json(data._id);
  } catch (error) {
    console.log(error);
  }
}

// put
async function newsPutCtr(req, res) {
  const { news_title, news_about, news_desc, news_type } = req.fields;
  const { news_img } = req.files;
  const { news_id } = req.params;
  if(!news_title || !news_about || !news_desc || !news_type || !news_img){
    return res.json({error: "Xatolik listlarni to'ldiring!"})
  }
  try {
    let data = await postModel.findOneAndUpdate({_id: news_id},{
      ...req.fields,
    },{new: true});
    if (news_img) {
      data.news_img.data = fs.readFileSync(news_img.path);
      data.news_img.contentType = news_img.type;
    }else{
      let data1 = await postModel.find({_id: news_id}).select('news_img');
      res.set('Content-Type', data.news_img.contentType);

      data.news_img.data = data1.news_img.data;
      data.news_img.contentType = data1.news_img.contentType;
    }
    data.save();
    res.json(data._id);
  } catch (error) {
    console.log(error);
  }
}

// delete
async function newsDeleteCtr(req, res) {
  const { news_id } = req.params;
  try {
    let data = await postModel.findOneAndDelete({_id:news_id});
    res.json({message: 'News deleted'});
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
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
};
