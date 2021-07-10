
const express = require("express");
const router = express.Router();

//get controllers
const authController = require("../controller/auth");

//create account
router.route("/signup")
    .post(authController.postSignUp);

//user login    
router.route("/signin")
    .post(authController.postSignin);


// user logout
router.route('/signout')
    .get(authController.signout) 


module.exports = router;