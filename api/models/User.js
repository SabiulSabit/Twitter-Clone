const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    hashPassword: {
      type: String,
      required: true,
    },
    followers: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

//add Methods
userSchema.methods = {
  //check password
  authenticate: function (plainText) {
    return bcrypt.compareSync(plainText, this.hashPassword);
  },
};

module.exports = mongoose.model("User", userSchema);
