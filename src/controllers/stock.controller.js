const express = require("express");
const crudController = require("./crud.controller");
const Stock = require("../models/stock.model");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", crudController.post(Stock));
router.get("/:id", crudController.getOne(Stock));

router.get("", crudController.getAll(Stock));
router.delete("/:id", crudController.deleteOne(Stock));

module.exports = router;
