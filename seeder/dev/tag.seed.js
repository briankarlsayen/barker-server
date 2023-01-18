const { faker } = require("@faker-js/faker");
const Tag = require("../../models/tag.model");

const createRandomTag = () => {
  const tags = [];
  Array.from({ length: 10 }).forEach(() => {
    tags.push({
      label: faker.random.words(1),
    });
  });
  return tags;
};

exports.createTags = async () => {
  const randData = [];
  try {
    randData.push(...createRandomTag());
    const dataArr = [];
    const newDatas = randData.map((tag) => {
      return new Promise((resolve, reject) => {
        Tag.create(tag)
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
    console.log("Error in seeding tags");
  }
};
