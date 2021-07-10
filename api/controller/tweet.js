const Tweet = require("../models/Tweet");

//create new tweet
exports.postCreatNewTweet = (req, res, next) => {

  const { text } = req.body;
  const authorId = req.profile._id;

  //valid title and content
  if (text.length <= 0) {
    return res.status(400).json({
      error: "Tweet Required",
    });
  }

  //create post
  const post = new Tweet({
    author: authorId,
    text: text,
  });

  post.save((err, data) => {
    if (err) {
      //console.log(err)
      return res.status(400).json({
        error: err,
      });
    }

    return res.json({
      data,
    });
  });
};
