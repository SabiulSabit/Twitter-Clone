
const express = require("express");
const router = express.Router();

//get controllers
const authController = require("../controller/auth");
const userController = require("../controller/user");
const tweetController = require("../controller/tweet");


//get user info
router
  .route("/user/:userId")
  .get(authController.requireSignin, userController.getUserProfile);  


//get user info from user id
router.param("userId", userController.userByID);  

//get post info from post id
router.param("postId", tweetController.postByID);

module.exports = router;