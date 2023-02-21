const express = require("express");
const crudController = require("./crud.controller");
const authenticate = require("../middlewares/authenticate");
const Watchlist = require("../models/watchlist.model");
const APIFeatures = require("../utils/apiFeatures");

const router = express.Router();

router.get("", authenticate, async (req, res) => {
  try {
    const features = new APIFeatures(
      Watchlist.find({ user_id: req.user._id }),
      req.query
    )
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query.populate("smallcase_id").lean().exec();

    return res.status(200).send(docs);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.post("/toggle", authenticate, async (req, res) => {
  let watchlist = await Watchlist.findOne({
    user_id: req.user._id,
    smallcase_id: req.body.smallcase_id,
  })
    .lean()
    .exec();

  if (watchlist === null) {
    watchlist = await Watchlist.create({
      user_id: req.user._id,
      smallcase_id: req.body.smallcase_id,
    });

    return res.status(200).send(watchlist);
  } else {
    await Watchlist.deleteOne(watchlist._id);
    return res.status(204).send({ message: "Success" });
  }
});

module.exports = router;
