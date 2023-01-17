const mongoose = require("mongoose");

const { ObjectId } = mongoose.Types;
const mailSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  userId: {
    type: ObjectId,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  code: {
    type: String,
    default: true,
  },
  otpCode: {
    type: String,
    default: null,
  },
  expires: {
    type: Date,
    default: Date.now(),
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

const mail = mongoose.model("mail", mailSchema);

module.exports = mail;
