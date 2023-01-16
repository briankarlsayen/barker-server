module.exports = function (app) {
  const authRoute = require("./routes/auth.router")

  app.use("/auth", authRoute)
}