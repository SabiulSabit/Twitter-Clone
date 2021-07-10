
const User = require("../models/User");

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