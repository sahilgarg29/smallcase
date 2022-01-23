const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "smallcase",
    required: true,
  },
  smallcase_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "smallcase",
    required: true,
  },
  buy_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("investment", investmentSchema);
