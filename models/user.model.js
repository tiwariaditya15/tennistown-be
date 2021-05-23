const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: { type: String },
  email: { type: String, unique: true },
  username: { type: String },
  password: { type: String },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
