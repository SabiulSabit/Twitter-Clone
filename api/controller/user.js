
const User = require("../models/User");
const Tweet = require("../models/Tweet");

//find user by id
exports.userByID = (req, res, next, id) => {

   //console.log(id)
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
  exports.getUserProfile = (req,res,next) =>{

    req.profile.hashPassword = undefined;

   // console.log(req.profile)
    let user = req.profile;

    Tweet.find({author: req.profile._id}).exec((err, result)=>{
      if(err){
        return res.status(400).json({
          error: "Something went wrong",
        });
      }else{

        return res.json({
          user: user,
          tweets: result
        });
      }
    })
    
  }