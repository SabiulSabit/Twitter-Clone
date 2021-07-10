const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const tweetSchema = new mongoose.Schema(
  {
    author:{
        type:ObjectId,
        ref:"User",
        required: true,
     },
    text: {
      type: String,
      trim: true,
      required: true,
      maxlenght: 5000,
    },
    
    likes: [{ type: ObjectId, ref: "User" }],
  },
  { timestamps: true }
);



module.exports = mongoose.model("Tweet", tweetSchema);
