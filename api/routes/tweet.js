
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


//delete tweet
router
  .route("/tweet/delete/:postId/:userId")
  .delete(authController.requireSignin, authController.isAuth, authController.isAuthor, tweetController.deleteTweet);    


//get user info from user id
router.param("userId", userController.userByID);  

//get post info from post id
router.param("postId", tweetController.postByID);

module.exports = router;