const express = require("express");
const crudController = require("./crud.controller");
const Segment = require("../models/segment.model");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("", crudController.post(Segment));
router.get("/:id", crudController.getOne(Segment));

router.get("", crudController.getAll(Segment));
router.delete("/:id", crudController.deleteOne(Segment));

module.exports = router;
