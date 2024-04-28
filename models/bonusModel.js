const { Schema, model } = require("mongoose");

const bonusSchema = new Schema(
  {
    bannerUrl: String,
    bonusUrl: String,
    status: String,
    description: String,
    couponCode:String
  },
  { timestamps: true }
);

const Bonus = model("Bonus", bonusSchema)
module.exports = Bonus