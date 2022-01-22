require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");
const Transaction = require("../models/transaction.model");
const User = require("../models/user.model");

const createOrder = (req, res) => {
  try {
    var instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET_KEY,
    });

    var options = {
      amount: req.body.amount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, async function (err, order) {
      if (err) return res.status(500).send(err);

      const transaction = await Transaction.create({
        order_id: order.id,
        amount: order.amount / 100,
      });
      return res.status(200).send(transaction);
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

const verifyPayment = async (req, res) => {
  try {
    let body = req.body.razorpay_order_id + "|" + req.body.razorpay_payment_id;

    var expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_KEY)
      .update(body.toString())
      .digest("hex");
    console.log("sig received ", req.body.razorpay_signature);
    console.log("sig generated ", expectedSignature);

    if (expectedSignature === req.body.razorpay_signature) {
      const transaction = await Transaction.findOneAndUpdate(
        { order_id: req.body.razorpay_order_id },
        { status: "success" }
      );
      const user = await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $inc: { balance: transaction.amount } }
      );
      return res.status(200).send(user);
    } else {
      return res.status(400).send({ message: "Invalid Payment Signature" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

module.exports = { createOrder, verifyPayment };
