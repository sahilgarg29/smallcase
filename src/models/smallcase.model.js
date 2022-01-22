const mongoose = require("mongoose");

const smallcaseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    tagline: { type: String, required: true },
    image_url: { type: String, required: true },
    returns: { type: Number, required: true },
    volatility: { type: String, required: true, enum: ["low", "med", "high"] },
    // minimum_investment: { type: Number, required: true },
    review_frequency: { type: String, required: false },
    last_review: { type: Date },
    next_review: { type: Date },
    sub_type: { type: String, enum: ["free", "paid"] },
    manager_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "manager",
      required: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("smallcase", smallcaseSchema);
