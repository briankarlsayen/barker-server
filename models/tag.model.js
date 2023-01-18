const mongoose = require("mongoose");

const tagSchema = new mongoose.Schema(
  {
    label: {
      type: String,
      required: [true, "Please input tag label."],
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

const tags = mongoose.model("tags", tagSchema);

module.exports = tags;
