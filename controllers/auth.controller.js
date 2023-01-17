const User = require("../models/user.model");
const Mail = require("../models/mail.model");
const { sendEmail } = require("../utils/sendEmail");

exports.register = async (req, res, next) => {
  const { fullName, email, password, birthDate, image, bio } = req.body;
  try {
    const emailExist = await User.findOne({ email, isDeleted: false }).exec();
    if (emailExist)
      return res.status(422).json({ message: "Email already exists" });
    const user = await User.create({
      fullName,
      email,
      password,
      birthDate,
      image,
      bio,
      role: "client",
    });
    if (!user)
      return res.status(422).json({ message: "Unable to create user" });
    return res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      email: username,
      isDeleted: false,
    }).exec();
    if (!user)
      return res.status(422).json({ message: "Invalid username or password" });
    if (!user.isActive)
      return res.status(422).json({ message: "Your acount is not active" });
    const token = await user.getSignedJwtToken();
    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(422).json({ message: "Invalid username or password" });

    return res.status(200).json({ token, message: "Successfully logged in" });
  } catch (error) {
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const validEmail = await User.findOne({ email, isDeleted: false }).exec();
    if (!validEmail)
      return res.status(422).json({ message: "Account does not exist" });
    const options = {
      userId: validEmail._id,
      to: email,
      subject: "Forgot password",
      code: "FP",
    };
    const response = await sendEmail(options);
    console.log("mail receipt", response);
    res.status(200).json({ success: true, message: "Mail successfully sent" });
  } catch (error) {
    next(error);
  }
};

exports.setPassword = async (req, res, next) => {
  const { password } = req.body;
  const { id } = req.params;
  try {
    const mail = await Mail.findOne({ token: id }).exec();
    if (!mail)
      return res
        .status(422)
        .json({ message: "Please request a password reset" });
    const user = await User.findOne({ _id: mail.userId }).exec();
    user.password = password;
    user.hasLogged = true;
    user.save();
    res.status(201).json({ message: "Successfully updated" });
  } catch (error) {
    next(error);
  }
};
