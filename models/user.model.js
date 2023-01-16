const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please input full name."],
    },
    email: {
      type: String,
      required: [true, "Please input email"],
    },
    password: {
      type: String,
      default: process.env.DEFAULT_PASS,
    },
    birthDate: {
      type: Date,
      default: null,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "client"],
        message: "Invalid user role",
      },
      required: [true, "Please input user role"],
    },
    image: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    followers: {
      type: [ObjectId],
      default: [],
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

userSchema.pre("save", async function (next) {
  if (this.password) {
    const salt = 10;
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
  }
  return next();
});

// userSchema.pre('insertMany', async (next, docs) => {
//   if (Array.isArray(docs) && docs.length) {
//     const hashedUsers = docs.map(async (data) => new Promise((resolve, reject) => {
//       bcrypt
//         .genSalt(10)
//         .then((salt) => {
//           const password = data.password.toString();
//           bcrypt
//             .hash(password, salt)
//             .then((hash) => {
//               const newUser = data;
//               newUser.password = hash;
//               resolve(newUser);
//             })
//             .catch((e) => {
//               reject(e);
//             });
//         })
//         .catch((e) => {
//           reject(e);
//         });
//     }));
//     docs = await Promise.all(hashedUsers); // resolve lint err
//     next();
//   } else {
//     return next(new Error('User list should not be empty')); // lookup early return pattern
//   }
// });

userSchema.methods.comparePassword = async function validatePassword(data) {
  return bcrypt.compare(data.toString(), this.password);
};

userSchema.methods.getSignedJwtToken = async function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const users = mongoose.model("users", userSchema);

module.exports = users;
