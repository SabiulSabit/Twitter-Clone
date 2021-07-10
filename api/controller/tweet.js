const Tweet = require("../models/Tweet");



//get tweet info from its id
exports.postByID = (req, res, next, id) => {
  Tweet.findById(id).exec((err, tweet) => {
    if (err || !tweet) {
      return res.status(400).json({
        error: "Tweet not Found",
      });
    }

    req.tweet = tweet;
    next();
  });
};

//create new tweet
exports.postCreatNewTweet = (req, res, next) => {

  const { text } = req.body;
  const authorId = req.profile._id;

  //valid content
  if (text.length <= 0) {
    return res.status(400).json({
      error: "Tweet Required",
    });
  }

  //create tweet
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


//delete a tweet
exports.deleteTweet = (req, res, next) => {
  let tweet = req.tweet;

  tweet.remove((err, result) => {
    if (err) {
      return res.status(400).json({
        error: err,
      });
    }
    return res.json({
      message: "Tweet deleted Successfully",
    });
  });
};

