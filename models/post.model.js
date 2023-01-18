const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: [true, "Please input user id."],
    },
    body: {
      type: String,
      required: [true, "Please input body."],
    },
    image: {
      type: String,
      default: null,
    },
    likes: {
      type: [ObjectId],
      default: [],
    },
    tags: {
      type: [ObjectId],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const posts = mongoose.model("posts", postSchema);

module.exports = posts;
