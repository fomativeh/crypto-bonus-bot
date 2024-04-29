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
const User = require("./models/userModel");

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
  const { bannerUrl, bonusUrl, status, description, couponCode, linkText, announcementText } = req.body;

  try {
    const newBonus = new Bonus({
      bannerUrl,
      bonusUrl,
      status,
      description,
      couponCode,
      announcementText,
      linkText,
    });

    await newBonus.save();

    const allUsers = await User.find();

    //Uses provided link text, or default text if absent
    const customLinkText = newBonus.linkText
      ? newBonus.linkText
      : "Press here to claim your bonus";

    //Uses provided reply message, or default text if absent
    const replyTextPart1 = newBonus.announcementText
      ? newBonus.announcementText
      : `    
*${newBonus.description}*
    
Status: *${newBonus.status.toUpperCase()}*
    
Coupon code: *${newBonus.couponCode}*`;

    const replyTextPart2 = `\n\n[${customLinkText}](${bonusUrl})`;

    const replyText = replyTextPart1 + replyTextPart2 + `\n\n[For more bonuses, click here](t.me/cryptobonus_livebot)`
    //Announce to all users
    allUsers.forEach(async (eachUser) => {
      await bot.telegram.sendPhoto(
        eachUser.chatId, // Replace with the chat ID where you want to send the photo
        { url: newBonus.bannerUrl }, // Specify the photo URL
        { caption: replyText, parse_mode: "Markdown" } // Specify the caption
      );
    });

    await bot.telegram.sendPhoto(
      "@dailycryptobonus_test", // Replace with the chat ID where you want to send the photo
      { url: newBonus.bannerUrl }, // Specify the photo URL
      { caption: replyText, parse_mode: "Markdown" } // Specify the caption
    );

    res.status(200).json({ success: true });
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
  if (!id) {
    return res.json({ success: false, error: "Bonus id is required." });
  }

  try {
    const bonusData = await Bonus.findById(id);
    if (!bonusData) {
      return res.json({ success: false, error: "Bonus not found." });
    }

    const updated = await bonusData.updateOne({ $set: req.body });
    console.log(updated);

    if (!updated) {
      return res.json({ success: false, error: "Could not update bonus." });
    }

    res.status(200).json({ success: true });
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

    res.status(200).json({ success: true, message: "Bonus deleted" });
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
  const { id } = ctx.from;

  //check if user already exists
  const userExists = await User.findOne({ chatId: id });
  if (!userExists) {
    const newUser = new User({ chatId: id });
    await newUser.save();
  }
  const replyText = `Welcome to crypto bonus bot.\n\nClick the button below to see amazing offers.`;
  ctx.reply(replyText, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Get your Bonus Now",
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
