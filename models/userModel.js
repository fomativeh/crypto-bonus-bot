const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    chatId: String,
  },
  { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;
