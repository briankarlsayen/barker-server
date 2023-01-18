const { isValidObjectId } = require("mongoose");
const Tag = require("../models/tag.model");

exports.createTag = async (req, res, next) => {
  const { label } = req.body;
  try {
    const tag = await Tag.create({ label });
    if (!tag) return res.status(422).json({ message: "Unable to create tag" });
    res.status(201).json({ message: "Tag successfully created" });
  } catch (err) {
    next(err);
  }
};

exports.displayTags = async (req, res, next) => {
  try {
    const posts = await Tag.find({ isDeleted: false, isActive: true }).exec();
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

exports.updateTag = async (req, res, next) => {
  const { id } = req.params;
  const { label } = req.body;
  try {
    const tag = await Tag.findOneAndUpdate(
      { _id: id },
      {
        label,
      },
    );
    if (!tag) return res.status(422).json({ message: "Unable to update tag" });
    res.status(201).json({ message: "Successfully updated tag" });
  } catch (err) {
    next(err);
  }
};

exports.archiveTag = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid params id" });
    const tag = await Tag.findOneAndUpdate(
      { _id: id },
      {
        isDeleted: true,
      },
    );
    if (!tag) return res.status(422).json({ message: "Unable to archive tag" });
    res.status(201).json({ message: "Successfully archived tag" });
  } catch (err) {
    next(err);
  }
};

exports.updateTagStatus = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid params id" });

    const status = await Tag.findById(id).exec();
    if (!status) return res.status(422).json({ message: "Invalid tag id" });

    const tag = await Tag.findOneAndUpdate(
      { _id: id },
      {
        isActive: !status.isActive,
      },
    );
    if (!tag)
      return res.status(422).json({ message: "Unable to update tag status" });
    res.status(201).json({ message: "Successfully updated tag status" });
  } catch (err) {
    next(err);
  }
};
