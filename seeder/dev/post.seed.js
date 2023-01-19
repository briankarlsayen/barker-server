const { faker } = require("@faker-js/faker");
const User = require("../../models/user.model");
const Post = require("../../models/post.model");
const Tag = require("../../models/tag.model");

const getUserId = async () => {
  const userCount = await User.count().exec();
  const random = Math.floor(Math.random() * userCount);
  const { _id } = await User.findOne().skip(random).exec();

  return _id;
};

const getTagsId = async () => {
  const tagArr = [];
  const maxTagCount = 5;
  const randomNum = Math.floor(Math.random() * maxTagCount);

  const count = await Tag.count().exec();
  const randArr = [];
  for (let i = 0; i < randomNum; i++) {
    randArr.push(Math.floor(Math.random() * count));
  }

  const uniqueRand = [...new Set(randArr)]; // filter for unique tags
  for (let j = 0; j < uniqueRand.length; j++) {
    const { _id } = await Tag.findOne().skip(uniqueRand[j]).exec();
    tagArr.push(_id);
  }

  return tagArr;
};

const getLikesId = async () => {
  const likesArr = [];
  const maxLikesCount = 5;
  const randomNum = Math.floor(Math.random() * maxLikesCount);

  for (let j = 0; j < randomNum; j++) {
    const id = await getUserId();
    likesArr.push(id);
  }
  return [...new Set(likesArr)];
};

const createRandomPost = async () => {
  const promises = [];
  const postsCount = 10;
  for (let i = 0; i < postsCount; i++) {
    promises.push({
      userId: await getUserId(),
      body: faker.lorem.paragraph(),
      image: faker.image.animals(),
      tags: await getTagsId(),
      likes: await getLikesId(),
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
