const { faker } = require("@faker-js/faker");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const getUserId = async () => {
  const userCount = await User.count().exec();
  const random = Math.floor(Math.random() * userCount);
  const { _id } = await User.findOne().skip(random).exec();

  return _id;
};

const getPostId = async () => {
  const userCount = await Post.count().exec();
  const random = Math.floor(Math.random() * userCount);
  const { _id } = await Post.findOne().skip(random).exec();

  return _id;
};

const createRandomComment = async () => {
  const promises = [];
  const postsCount = 10;
  for (let i = 0; i < postsCount; i++) {
    promises.push({
      userId: await getUserId(),
      postId: await getPostId(),
      body: faker.lorem.paragraph(),
    });
  }
  const posts = await Promise.all(promises);
  return posts;
};

exports.createComments = async () => {
  const randData = [];

  try {
    randData.push(await createRandomComment());
    const dataArr = [];
    const newDatas = randData.map((comment) => {
      return new Promise((resolve, reject) => {
        Comment.create(comment)
          .then((res) => {
            dataArr.push(res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
    await Promise.all(newDatas);
    return dataArr;
  } catch (err) {
    console.log("Error in seeding comments");
  }
};
