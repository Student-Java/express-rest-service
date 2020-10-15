const User = require('./user.model');
const tasksRepo = require('../tasks/task.memory.repository');

const usersDB = new Map();

const getAll = () => {
  const arr = [];
  for (const el of usersDB.values()) {
    arr.push(el);
  }
  return arr;
};

const addUser = (name, login, password) => {
  const newUser = new User({ name, login, password });
  usersDB.set(newUser.id, newUser);
  return newUser;
};

const getUserById = userId => {
  if (usersDB.has(userId)) {
    return usersDB.get(userId);
  }
  return undefined;
};

const updateUser = (userId, name, login, password) => {
  const foundUser = { ...getUserById(userId) };
  if (usersDB.has(userId)) {
    usersDB.get(userId).name = name !== undefined ? name : foundUser.name;
    usersDB.get(userId).login = login !== undefined ? login : foundUser.login;
    usersDB.get(userId).password =
      password !== undefined ? password : foundUser.password;
  }

  return usersDB.get(userId);
};

const deleteUser = userId => {
  if (usersDB.has(userId)) {
    const deletedUser = { ...usersDB.get(userId) };
    tasksRepo.resetUser(userId);
    usersDB.delete(userId);
    return deletedUser;
  }
  return undefined;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
