const APIFeatures = require("../utils/apiFeatures");

exports.getOne = (Model, popOptions) => async (req, res) => {
  try {
    let query = Model.findById(req.params.id);

    if (popOptions) query.populate(popOptions);

    const doc = await query.lean().exec();

    return res.status(200).send(doc);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.getAll = (Model, popOptions) => async (req, res) => {
  try {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const docs = await features.query.lean().exec();

    return res.status(200).send(docs);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.post = (Model) => async (req, res) => {
  try {
    const doc = await Model.create(req.body);
    return res.status(201).send(doc);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.updateOne = (Model) => async (req, res) => {
  try {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body);
    return res.status(200).send(doc);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

exports.deleteOne = (Model) => async (req, res) => {
  try {
    await Model.findByIdAndDelete(req.params.id);
    return res.status(204).send({ message: "success" });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
