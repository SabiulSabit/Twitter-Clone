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

  Tweet.find({ author: req.profile._id })
    .sort( { 'createdAt' : -1 })
    .exec((err, result) => {
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
      Tweet.find({ author: req.profile._id })
        .sort( { 'createdAt' : -1 })
        .exec((err1, tweets) => {
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

// follow user
exports.putFollowUser = (req, res, next) => {
  // console.log(req.auth.id);
  // console.log(req.profile._id);

  // user can't follow himself
  if (req.auth.id == req.profile._id) {
    return res.status(400).json({
      error: "You Can't follow yourself",
    });
  }

  User.findByIdAndUpdate(
    req.profile._id,
    {
      $push: { followers: req.auth.id },
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
        User.findByIdAndUpdate(
          req.auth.id,
          {
            $push: { following: req.profile._id },
          },
          {
            new: true,
          },
          (err1, result1) => {
            if (err1) {
              return res.status(400).json({
                error: "Something went wrong",
              });
            } else {
              result.hashPassword = undefined
              return res.json({
                
                user: result
              });
            }
          }
        );
      }
    }
  );
};


//unfollow user
exports.putUnFollowUser = (req,res,nex) =>{
 
    // user can't unfollow himself
    if (req.auth.id == req.profile._id) {
      return res.status(400).json({
        error: "You Can't unfollow yourself",
      });
    }

    User.findByIdAndUpdate(
      req.profile._id,
      {
        $pull: { followers: req.auth.id },
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
         
          User.findByIdAndUpdate(
            req.auth.id,
            {
              $pull: { following: req.profile._id },
            },
            {
              new: true,
            },
            (err1, result1) => {
              if (err1) {
                return res.status(400).json({
                  error: "Something went wrong",
                });
              } else {
                result.hashPassword = undefined
                return res.json({ 
                  user: result
                });
              }
            }
          );
        }
      }
    );
}

