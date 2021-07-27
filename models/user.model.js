const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  fullname: {
    type: String,
    required: [true, "Fullname is missing."],
    validate: {
      validator: function (fullname) {
        return fullname.length > 0;
      },
      message: (props) => `Fullname can't be zero. Got ${props.value} instead.`,
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (email) {
        return /\w+(\d+)?@\w+\.\w+/.test(email);
      },
      message: (props) => `${props.value} isn't valid email.`,
    },
    required: [true, "Email is missing."],
  },
  username: {
    type: String,
    unique: true,
    validate: {
      validator: function (username) {
        return username.length >= 8 && username.length <= 16;
      },
      message: (props) =>
        `Username must have 8-16 characters with atleast a number.`,
    },
    required: [true, "Username is missing."],
  },
  password: {
    type: String,
    validate: {
      validator: function (password) {
        return password.length >= 8;
      },
      message: (props) =>
        `Password should be atleast 8 characters long with atleast a number.`,
    },
    required: [true, "Password is missing."],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
