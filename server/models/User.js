const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    require: false,
  },
  // offering: [{ type: mongoose.Schema.Types.ObjectId, ref: "Offering" }],
  // wanted: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wanted" }],
});

userSchema.pre("save", function(next) {
  if (!this.isModified("password")) {
    return next;
  }
  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) {
      return next(err);
    }
    this.password = hashedPassword;
    next();
  });
});

module.exports = mongoose.model("User", userSchema);
