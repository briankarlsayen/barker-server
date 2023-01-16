module.exports = function (app) {
  const { auth } = require("./middlewares/protect");
  const authRoute = require("./routes/auth.router");
  const userRoute = require("./routes/user.routes");

  app.use(auth);
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
};
