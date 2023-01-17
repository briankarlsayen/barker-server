const mongoose = require("mongoose");
require("dotenv").config({ path: ".env" });
const { createUsers } = require("./user.seed");

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("MongoDB is Connected");
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
};

const deleteCollections = async () => {
  try {
    const names = await mongoose.connection.db.collections();
    if (names) {
      console.log("Deleting collections:");
      Promise.all(
        names.map(async function (name) {
          const colName = name?.s?.namespace?.collection;
          mongoose.connection.db.dropCollection(colName);
          console.log("--->>", colName);
        }),
      );
      return true;
    }
  } catch (err) {
    console.log("err", err);
  }
};

const createSeedCollections = async () => {
  console.log("Seeding collections:");
  const users = await createUsers();
  console.log("--->>", "users");

  mongoose.connection.close();
  console.log("Done seeding database");
};

const seedDB = async () => {
  try {
    await connectDB();
    const deleted = await deleteCollections();
    if (deleted) {
      setTimeout(() => createSeedCollections(), 3000);
    } else {
      mongoose.connection.close();
    }
  } catch (err) {
    console.log("Error encountered, please try again");
  }
};

try {
  seedDB();
} catch (err) {
  console.log("err", err);
}
