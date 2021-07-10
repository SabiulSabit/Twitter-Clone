const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
require('dotenv').config();


//require sign in
exports.requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: "auth",
});

//check if the user is loged in
exports.isAuth = (req, res, next) => {
  let user = req.profile && req.auth && req.profile._id == req.auth.id;

  //console.log(req.profile._id, req.auth.id);
  if (!user) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  next();
};

//check if the user is the author of a tweet
exports.isAuthor = (req, res, next) => {
  if (!req.profile._id == req.tweet.author) {
    return res.status(403).json({
      error: "Access Denied",
    });
  }

  next();
};

// create user account
exports.postSignUp = (req,res,next) =>{
    const { name, email, password } = req.body;

    //hash the password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
  
    const user = new User({ username: name, email: email, hashPassword: hash });
    user.save((err, user) => {
      if (err) {
        //console.log(err)
        return res.status(400).json({
          error: "Email Already in Use",
        });
      }
  
      user.hashPassword = undefined;
      return res.json({
        user,
      });
    });
}

//user login
exports.postSignin = (req,res,next) => {
 
  const { email, password } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "Email is Not Registred!! Please Signup First",
      });
    }
    
    //if user is not authenticated
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: "Email and Password dont Match",
      });
    }
    
    //create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.cookie("t", token, { expire: new Date() + 9999 });

    const { _id, username, email } = user;
    return res.json({
      token,
      user: {
        _id,
        email,
        username,
      },
    });
  });
}


//user signout
exports.signout = (req, res, next) => {
  res.clearCookie('t');
  res.json({ message: "Signout Successfully" });
}
