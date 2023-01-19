const Post = require("../models/post.model");
const Tag = require("../models/tag.model");
const User = require("../models/user.model");
const Comment = require("../models/comment.model");

exports.displayInteractions = async (req, res, next) => {
  const { limit } = req.query;
  const limitCount = limit ? Number(limit) : await Tag.find().count();
  try {
    const tags = await Tag.aggregate([
      {
        $match: {
          $and: [{ isDeleted: false }, { isActive: true }],
        },
      },
      {
        $lookup: {
          from: "posts",
          let: { tagId: "$_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $in: ["$$tagId", "$tags"] } },
                  { isDeleted: false },
                  { isActive: true },
                ],
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
                ],
                as: "comments",
              },
            },
            {
              $project: {
                commentsCount: {
                  $cond: {
                    if: { $isArray: "$comments" },
                    then: { $size: "$comments" },
                    else: 0,
                  },
                },
                likesCount: {
                  $cond: {
                    if: { $isArray: "$likes" },
                    then: { $size: "$likes" },
                    else: 0,
                  },
                },
              },
            },
          ],
          as: "posts",
        },
      },
      {
        $lookup: {
          from: "posts",
          let: { tagId: "$_id" },
          pipeline: [
            {
              $match: {
                $and: [
                  { $expr: { $in: ["$$tagId", "$tags"] } },
                  { isDeleted: false },
                  { isActive: true },
                ],
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
                ],
                as: "comments",
              },
            },
            {
              $project: {
                commentsCount: {
                  $cond: {
                    if: { $isArray: "$comments" },
                    then: { $size: "$comments" },
                    else: 0,
                  },
                },
                likesCount: {
                  $cond: {
                    if: { $isArray: "$likes" },
                    then: { $size: "$likes" },
                    else: 0,
                  },
                },
              },
            },
            {
              $group: {
                _id: 0,
                commentsSum: { $sum: "$commentsCount" },
                likesSum: { $sum: "$likesCount" },
              },
            },
            {
              $addFields: {
                totalInteractions: {
                  $sum: ["$commentsSum", "$likesSum"],
                },
              },
            },
          ],
          as: "postInteractions",
        },
      },
      {
        $project: {
          label: 1,
          createdAt: 1,
          posts: 1,
          postsCount: {
            $cond: {
              if: { $isArray: "$posts" },
              then: { $size: "$posts" },
              else: 0,
            },
          },
          commentsCount: { $arrayElemAt: ["$postInteractions.commentsSum", 0] },
          likesCount: { $arrayElemAt: ["$postInteractions.likesSum", 0] },
          totalInteractions: {
            $arrayElemAt: ["$postInteractions.totalInteractions", 0],
          },
        },
      },
      {
        $sort: {
          totalInteractions: -1,
          likesCount: -1,
        },
      },
      {
        $limit: limitCount,
      },
    ]).exec();
    res.status(200).json(tags);
  } catch (err) {
    next(err);
  }
};

exports.displayCounters = async (req, res, next) => {
  try {
    const users = await User.find({ isDeleted: false }).count().exec();
    const posts = await Post.find({ isDeleted: false }).count().exec();
    const comments = await Comment.find({ isDeleted: false }).count().exec();
    const tags = await Tag.find({ isDeleted: false }).count().exec();
    res.status(200).json({
      users,
      posts,
      comments,
      tags,
    });
  } catch (err) {
    next(err);
  }
};
