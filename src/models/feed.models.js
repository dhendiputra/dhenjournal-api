const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FeedModel = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    cloudinary_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("FeedModel", FeedModel);
