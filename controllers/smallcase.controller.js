const express = require("express");
const crudController = require("./crud.controller");
const Smallcase = require("../models/smallcase.model");
const authenticate = require("../middlewares/authenticate");
const Segment = require("../models/segment.model");
const User = require("../models/user.model");
const Investment = require("../models/investment.model");

const getAllSmallcaseData = async (id) => {
  let query = Smallcase.findById(id);

  const doc = await query.lean().exec();
  let etfs = await Segment.find({ smallcase_id: id })
    .populate("stocks.stock_id")
    .lean()
    .exec();

  let minimum_investment = 0;

  for (let i = 0; i < etfs.length; i++) {
    for (let j = 0; j < etfs[i].stocks.length; j++) {
      minimum_investment +=
        etfs[i].stocks[j].stock_id.current_price * etfs[i].stocks[j].quantity;
    }
  }

  return {
    data: doc,
    minimum_investment: minimum_investment,
    etfs: etfs,
  };
};

const router = express.Router();

router.post("", crudController.post(Smallcase));
router.get("/:id", async (req, res) => {
  try {
    const data = await getAllSmallcaseData(req.params.id);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

router.get("", async (req, res) => {
  try {
    const smallcases = await Smallcase.find().lean().exec();
    let arr = smallcases.map(function (e) {
      return getAllSmallcaseData(e._id);
    });

    var data = await Promise.all(arr);
    console.log(data);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});
router.delete("/:id", authenticate, crudController.deleteOne(Smallcase));
router.post("/:id/invest", authenticate, async (req, res) => {
  try {
    const smallCaseData = await getAllSmallcaseData(req.params.id);
    const user = await User.findById(req.user._id).lean().exec();
    console.log(user);
    if (user.balance >= smallCaseData.minimum_investment * req.body.quantity) {
      const investment = await Investment.create({
        smallcase_id: req.params.id,
        user_id: req.user._id,
        buy_price: smallCaseData.minimum_investment,
        quantity: req.body.quantity,
      });
      await User.findByIdAndUpdate(req.user._id, {
        balance:
          user.balance - smallCaseData.minimum_investment * req.body.quantity,
      });

      return res.status(201).send(investment);
    } else {
      res.status(400).send({
        message: `Low Balance ${
          user.amount - smallCaseData.minimum_investment * req.body.quantity
        }`,
      });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
});

module.exports = router;
