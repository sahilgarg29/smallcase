const mongoose = require("mongoose");

const segmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  smallcase_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "smallcase",
    required: true,
  },
  stocks: [
    {
      stock_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "stock",
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("segment", segmentSchema);
