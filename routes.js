module.exports = function (app) {
  const { auth } = require("./middlewares/protect");
  const authRoute = require("./routes/auth.router");
  const userRoute = require("./routes/user.router");
  const postRoute = require("./routes/post.router");
  const commentRoute = require("./routes/comment.router");
  const tagRoute = require("./routes/tag.router");
  const dashboardRoute = require("./routes/dashboard.router");

  app.use(auth);
  app.use("/api/auth", authRoute);
  app.use("/api/users", userRoute);
  app.use("/api/posts", postRoute);
  app.use("/api/comments", commentRoute);
  app.use("/api/tags", tagRoute);
  app.use("/api/dashboard", dashboardRoute);
};
