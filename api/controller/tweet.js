const Tweet = require("../models/Tweet");
const User = require("../models/User");

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
    Tweet.find({ author: result.author }).exec((err, tweets) => {
      if (err) {
        return res.status(400).json({
          error: "Somting went wrong",
        });
      } else {
        return res.json({
          message: "Tweet deleted Successfully",
          tweets: tweets,
        });
      }
    });
  });
};

//get tweet details
exports.getTweetDetails = (req, res, next) => {
  Tweet.findById(req.tweet._id)
    .populate("author", "_id username")
    .sort("-created")
    .exec((err, tweet) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      } else {
        return res.json({
          tweet: tweet,
        });
      }
    });
};

//like a post
exports.putLike = (req, res, next) => {
  Tweet.findByIdAndUpdate(
    req.tweet._id,
    {
      $push: { likes: req.auth.id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      } else {
        Tweet.findById(result._id)
          .populate("author", "_id username")
          .sort("-created")
          .exec((err, tweet) => {
            if (err) {
              return res.status(400).json({
                error: "Something went wrong",
              });
            } else {
              return res.json({
                tweet: tweet,
              });
            }
          });
      }
    }
  );
};

//unlike a post from like
exports.putUnLike = (req, res, next) => {
  Tweet.findByIdAndUpdate(
    req.tweet._id,
    {
      $pull: { likes: req.auth.id },
    },
    {
      new: true,
    },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Something went wrong",
        });
      } else {
        Tweet.findById(result._id)
          .populate("author", "_id username")
          .sort("-created")
          .exec((err, tweet) => {
            if (err) {
              return res.status(400).json({
                error: "Something went wrong",
              });
            } else {
              return res.json({
                tweet: tweet,
              });
            }
          });
      }
    }
  );
};

//get tweets
exports.getTweets = (req, res, next) => {
  let { page = 1 } = req.query;
  let limit = 10;
  page = parseInt(page);
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  let nextPage = 0,
    prevPage = 0;

  User.findById(req.auth.id).exec((err, user) => {
    if (err) {
      throw err;
    } else {
      user.following.push(req.auth.id);
      Tweet.find({ author: { $in: user.following } })
        .populate("author", "_id username")
        .sort({ createdAt: -1 })
        .exec((err, tweets) => {
          if (err) {
            return res.status(400).json({
              error: "Something went wrong",
            });
          } else {
            if (endIndex < tweets.length) {
              nextPage = page + 1;
            }
            if (startIndex > 0) {
              prevPage = page - 1;
            }

            return res.json({
              nextPage: nextPage,
              prevPage: prevPage,
              tweets: tweets.slice(startIndex, endIndex),
            });
          }
        });
    }
  });
};
