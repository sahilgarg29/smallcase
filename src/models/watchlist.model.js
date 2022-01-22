const mongoose = require("mongoose");

const watchlistSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    smallcase_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "smallcase",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("watchlist", watchlistSchema);
