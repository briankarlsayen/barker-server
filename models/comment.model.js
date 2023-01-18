const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const commentSchema = new mongoose.Schema(
  {
    userId: {
      type: ObjectId,
      required: [true, "Please input user id."],
    },
    postId: {
      type: ObjectId,
      required: [true, "Please input post id."],
    },
    body: {
      type: String,
      required: [true, "Please input body."],
    },
    likes: {
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

const comments = mongoose.model("comments", commentSchema);

module.exports = comments;
