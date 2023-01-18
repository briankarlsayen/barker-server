const { faker } = require("@faker-js/faker");
const User = require("../../models/user.model");

const createRandomUser = () => {
  const randomNum = Math.floor(Math.random() * 2);
  const roleArr = ["admin", "client"];

  const users = [];
  Array.from({ length: 10 }).forEach(() => {
    users.push({
      fullName: faker.name.fullName(),
      email: faker.internet.email(),
      gender: faker.name.sex(),
      role: roleArr[randomNum],
      password: "123",
      birthDate: faker.date.between(
        "1980-01-01T00:00:00.000Z",
        "2023-01-01T00:00:00.000Z",
      ),
      isActive: true,
      bio: faker.lorem.paragraph(),
    });
  });
  return users;
};

exports.createUsers = async () => {
  const userData = [
    {
      fullName: "admin",
      email: "admin@mail.com",
      gender: "male",
      role: "admin",
      password: "123",
      birthDate: "01/01/2000",
      isActive: true,
      bio: "I am atomic",
    },
    {
      fullName: "ainz",
      email: "ainz@mail.com",
      gender: "male",
      role: "client",
      password: "123",
      birthDate: "01/01/2000",
      isActive: true,
      bio: "Madou Ou",
    },
  ];
  userData.push(createRandomUser());
  try {
    const users = [];
    const newUsers = userData.map((user) => {
      return new Promise((resolve, reject) => {
        User.create(user)
          .then((res) => {
            users.push(res);
            resolve(res);
          })
          .catch((err) => {
            reject(err);
          });
      });
    });
    await Promise.all(newUsers);
    return users;
  } catch (err) {
    console.log("Error in seeding users");
  }
};
