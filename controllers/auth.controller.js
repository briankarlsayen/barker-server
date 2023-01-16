const User = require("../models/user.model");

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
    res.status(201).json({ message: "Successfully created" });
  } catch (error) {
    next(error);
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
      return res.status(422).json({ message: 'Your acount is not active' });
    const token = await user.getSignedJwtToken();
    const validPassword = await user.comparePassword(password);
    if (!validPassword)
      return res.status(422).json({ message: "Invalid username or password" });

    res.status(200).json({ token, message: "Successfully logged in" });
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};
