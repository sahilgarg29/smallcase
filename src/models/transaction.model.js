const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    order_id: { type: String, unique: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["pending", "success", "fail"],
      default: "pending",
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("transaction", transactionSchema);
