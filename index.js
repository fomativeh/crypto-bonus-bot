const { Telegraf } = require("telegraf");
const rateLimit = require("telegraf-ratelimit");
require("dotenv").config();
const express = require("express");
const app = express();
const { Schema, model, default: mongoose } = require("mongoose");
const { v1: uuidv1 } = require("uuid");
const bodyParser = require("body-parser");
const cors = require("cors");
const Bonus = require("./models/bonusModel");

const bot = new Telegraf(process.env.BOT_TOKEN);
const limitConfig = {
  window: 1000, // 1 second
  limit: 22, // 22 requests per second
  keyGenerator: (ctx) => ctx.chat.id, // Limit requests per chat ID
};
bot.use(rateLimit(limitConfig));

app.use(
  cors({
    origin: "*",
  })
);

// Parse URL-encoded bodies (deprecated in Express v4.16+)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/bonus", async (req, res) => {
  const { exchange, bannerUrl, bonusLink, status, name, description, couponCode } =
    req.body;

  try {
    const newBonus = new Bonus({
      exchange,
      bannerUrl,
      bonusLink,
      status,
      name,
      description,
      couponCode
    });

    await newBonus.save();

    res.status(200).json({ success: true});
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

app.get("/bonuses", async (req, res) => {
  const allBonuses = await Bonus.find();

  try {
    res.status(200).json({ success: true, data: allBonuses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

app.patch("/bonus/:id", async (req, res) => {
  const { id } = req.params;
  const { updateDetails } = req.body;

  if (!id) {
    return res.json({ success: false, error: "Bonus id is required." });
  }

  try {
    const bonusData = await Bonus.findById(id);
    if (!bonusData) {
      return res.json({ success: false, error: "Bonus not found." });
    }

    await bonusData.updateOne({ $set: updateDetails });

    const latestBonuses = await Bonus.find();

    res.status(200).json({ success: true, data: latestBonuses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});


app.delete("/bonus/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, error: "Bonus id is required." });
  }

  try {
    const bonusData = await Bonus.findByIdAndDelete(id);
    if (!bonusData) {
      return res.json({ success: false, error: "Couldn't delete doc." });
    }

    res.status(200).json({ success: true, message:"Bonus deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

mongoose
  .connect(process.env.URI)
  .then(() => console.log("Connected to db."))
  .catch((error) => console.log(error));

bot.start(async (ctx) => {
  const replyText = `Welcome to crypto bonus bot.\n\nClick the button below to start the mini app`;
  ctx.reply(replyText, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Launch mini app",
            web_app: {
              url: "https://crypto-bonus-bot.vercel.app",
            },
          },
        ],
      ],
    },
  });
});

// Set bot commands for Telegram
bot.telegram.setMyCommands([
  { command: "start", description: "Start the crypto bonus Bot" },
]);

bot.launch();
