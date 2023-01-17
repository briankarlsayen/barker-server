const { faker } = require("@faker-js/faker");
const User = require("../models/user.model");
const Post = require("../models/post.model");

const getUserId = async () => {
  const userCount = await User.count().exec();
  const random = Math.floor(Math.random() * userCount);
  const { _id } = await User.findOne().skip(random).exec();

  return _id;
};

const createRandomPost = async () => {
  const promises = [];
  const postsCount = 20;
  for (let i = 0; i < postsCount; i++) {
    promises.push({
      userId: await getUserId(),
      body: faker.lorem.paragraph(),
      image: null,
    });
  }
  const posts = await Promise.all(promises);
  return posts;
};

exports.createPosts = async () => {
  const postData = [];

  try {
    postData.push(await createRandomPost());
    const posts = [];
    const newPosts = postData.map((post) => {
      return new Promise((resolve, reject) => {
        Post.create(post)
          .then((res) => {
            posts.push(res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
    await Promise.all(newPosts);
    return posts;
  } catch (err) {
    console.log("Error in seeding posts");
  }
};
