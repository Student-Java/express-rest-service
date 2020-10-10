const User = require('./user.model');

const usersDB = [
  new User({
    name: 'test',
    login: 'test',
    password: 'testPass'
  }),
  new User({
    name: 'test2',
    login: 'test2',
    password: 'test2Pass'
  })
];

const getAll = async () => {
  return usersDB;
};

const addUser = async (name, login, password) => {
  try {
    const newUser = await new User({ name, login, password });
    usersDB.push(newUser);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async userId => {
  return usersDB.find(el => el.id === userId);
};

const updateUser = async (userId, name, login, password) => {
  const foundUser = usersDB.find(x => x.id === userId);
  if (foundUser) {
    foundUser.name = name !== undefined ? name : foundUser.name;
    foundUser.login = login !== undefined ? login : foundUser.login;
    foundUser.password = password !== undefined ? password : foundUser.password;
  }
  return foundUser;
};

const deleteUser = async userId => {
  const foundIdx = usersDB.findIndex(x => x.id === userId);
  if (foundIdx >= 0) {
    return usersDB.splice(foundIdx, 1);
  }
  return false;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
