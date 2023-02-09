const { isValidObjectId } = require("mongoose");
const Post = require("../models/post.model");

exports.createPost = async (req, res, next) => {
  const { body, image, tags } = req.body;
  const { userInfo } = req;
  try {
    const post = await Post.create({ userId: userInfo._id, body, image, tags });
    if (!post)
      return res.status(422).json({ message: "Unable to create post" });
    res.status(201).json({ message: "Post successfully created" });
  } catch (err) {
    next(err);
  }
};

exports.displayPosts = async (req, res, next) => {
  try {
    const posts = await Post.aggregate([
      {
        $match: {
          $and: [{ isDeleted: false }, { isActive: true }],
        },
      },
      {
        $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $eq: ["$postId", "$$postId"] } },
                  { isDeleted: false },
                  { isActive: true },
                ],
              },
            },
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user",
              },
            },
            {
              $project: {
                body: 1,
                likes: 1,
                user: { $arrayElemAt: ["$user", 0] },
              },
            },
          ],
          as: "comments",
        },
      },
      {
        $lookup: {
          from: "tags",
          let: { tags: "$tags" },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $in: ["$_id", "$$tags"] } },
                  { isDeleted: false },
                  { isActive: true },
                ],
              },
            },
            {
              $project: {
                label: 1,
              },
            },
          ],
          as: "tags",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userData",
        },
      },
    ]).exec();
    res.status(200).send(posts);
  } catch (err) {
    next(err);
  }
};

exports.viewPost = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid params id" });
    const post = await Post.findOne({
      _id: id,
      isDeleted: false,
      isActive: true,
    }).exec();

    if (!post) return res.status(422).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

exports.updatePost = async (req, res, next) => {
  const { id } = req.params;
  const { body, image, tags } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { _id: id },
      {
        body,
        image,
        tags,
      },
    );
    if (!post)
      return res.status(422).json({ message: "Unable to update post" });
    res.status(201).json({ message: "Successfully updated post" });
  } catch (err) {
    next(err);
  }
};

exports.archivePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id))
      return res.status(400).json({ message: "Invalid params id" });
    const post = await Post.findOneAndUpdate(
      { _id: id },
      {
        isDeleted: true,
      },
    );
    if (!post)
      return res.status(422).json({ message: "Unable to archive post" });
    res.status(201).json({ message: "Successfully archived post" });
  } catch (err) {
    next(err);
  }
};
