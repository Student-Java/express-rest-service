const User = require('./user.model');

const usersDB = new Map();

const getAll = async () => {
  const arr = [];
  for (const el of usersDB.values()) {
    arr.push(el);
  }
  return arr;
};

const addUser = async (name, login, password) => {
  try {
    const newUser = await new User({ name, login, password });
    usersDB.set(newUser.id, newUser);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getUserById = async userId => {
  if (usersDB.has(userId)) {
    return usersDB.get(userId);
  }
  return undefined;
};

const updateUser = async (userId, name, login, password) => {
  const foundUser = { ...getUserById(userId) };
  if (usersDB.has(userId)) {
    usersDB.get(userId).name = name !== undefined ? name : foundUser.name;
    usersDB.get(userId).login = login !== undefined ? login : foundUser.login;
    usersDB.get(userId).password =
      password !== undefined ? password : foundUser.password;
  }

  return usersDB.get(userId);
};

const deleteUser = async userId => {
  if (usersDB.has(userId)) {
    usersDB.delete(userId);
    return true;
  }
  return undefined;
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
