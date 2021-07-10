const User = require("../models/User");
const Tweet = require("../models/Tweet");

//find user by id
exports.userByID = (req, res, next, id) => {
  //console.log(id);
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not Found",
      });
    }

    req.profile = user;
    next();
  });
};

//get user profile
exports.getUserProfile = (req, res, next) => {
  req.profile.hashPassword = undefined;

  // console.log(req.profile)
  let user = req.profile;

  Tweet.find({ author: req.profile._id }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    } else {
      return res.json({
        user: user,
        tweets: result,
      });
    }
  });
};

//get all user data
exports.getAllProfile = (req, res, next) => {
  //console.log("here" req.auth.id);
  User.find({ _id: { $ne: req.auth.id } }).exec((err, result) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    } else {
      result.hashPassword = undefined;
      return res.json({
        users: result,
      });
    }
  });
};

//get other user profile
exports.getOtherUserProfile = (req, res, next) => {

  User.findById({ _id: req.profile._id }).exec((err, user) => {
    if (err) {
      return res.status(400).json({
        error: "Something went wrong",
      });
    } else {
      user.hashPassword = undefined;
      Tweet.find({ author: req.profile._id }).sort('-createdAt').exec((err1, tweets) => {
        if (err1) {
          return res.status(400).json({
            error: "Something went wrong",
          });
        } else {
          return res.json({
            user: user,
            tweets: tweets,
          });
        }
      });
    }
  });
};
