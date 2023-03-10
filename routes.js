module.exports = function (app) {
  const { auth } = require("./middlewares/protect");
  const authRoute = require("./routes/auth.router");
  const userRoute = require("./routes/user.router");
  const postRoute = require("./routes/post.router");
  const commentRoute = require("./routes/comment.router");
  const tagRoute = require("./routes/tag.router");
  const dashboardRoute = require("./routes/dashboard.router");

  app.use(auth);
  app.use("/auth", authRoute);
  app.use("/users", userRoute);
  app.use("/posts", postRoute);
  app.use("/comments", commentRoute);
  app.use("/tags", tagRoute);
  app.use("/dashboard", dashboardRoute);
};
