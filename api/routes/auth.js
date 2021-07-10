
const express = require("express");
const router = express.Router();

//get controllers
const authController = require("../controller/auth");

//create account
router.route("/signup")
    .post(authController.postSignUp);


module.exports = router;