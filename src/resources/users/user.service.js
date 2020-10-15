const checkExistence = require('../../common/utils/checkExistence');
const checkID = require('../../common/utils/checkID');
const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const addUser = async (name, login, password) => {
  return await usersRepo.addUser(name, login, password);
};

const getUserById = async userId => {
  return await checkExistence(usersRepo.getUserById, 'USER', checkID(userId));
};

const updateUser = async (userId, name, login, password) => {
  return await checkExistence(
    usersRepo.updateUser,
    'USER',
    userId,
    name,
    login,
    password
  );
};

const deleteUser = async userId => {
  return await checkExistence(usersRepo.deleteUser, 'USER', checkID(userId));
};

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
