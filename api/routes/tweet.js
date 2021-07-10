
const express = require("express");
const router = express.Router();

//get controllers
const authController = require("../controller/auth");
const userController = require("../controller/user");
const tweetController = require("../controller/tweet");


//create a new tweet
router
  .route("/tweet/post/:userId")
  .post(authController.requireSignin, authController.isAuth, tweetController.postCreatNewTweet);



//get user info from user id
router.param("userId", userController.userByID);  

module.exports = router;