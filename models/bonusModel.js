const { Schema, model } = require("mongoose");

const bonusSchema = new Schema(
  {
    exchange: String,
    bannerUrl: String,
    bonusLink: String,
    status: String,
    name: String,
    description: String,
    couponCode:String
  },
  { timestamps: true }
);

const Bonus = model("Bonus", bonusSchema)
module.exports = Bonus