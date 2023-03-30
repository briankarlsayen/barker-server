require("dotenv").config({ path: ".env" });
const express = require("express");
const cors = require("cors");

const app = express();
const server = require("http").createServer(app);
const connectDB = require("./config/db");

const PORT = process.env.PORT || 5081;
const { REDIS_HOST, REDIS_PORT, REDIS_PASSWORD } = process.env;
const { errorHandler } = require("./middlewares/errorHandler");

// const allowedOrigins = [
//   "http://localhost:3000",
//   "https://twitty-ks7zyyywy-ggnaz.vercel.app",
// ];

// // * middlewares
// app.use(
//   cors({
//     origin(origin, callback) {
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg =
//           "The CORS policy for this site does not " +
//           "allow access from the specified Origin.";
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   }),
// );

app.use(
  cors({
    origin: "*",
  }),
);
app.use(express.json());

connectDB();

// * routes
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Routes alive" });
});
require("./routes")(app);

app.use(errorHandler);
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
