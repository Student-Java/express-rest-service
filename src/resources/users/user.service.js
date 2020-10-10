const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const addUser = async (name, login, password) => {
  return await usersRepo.addUser(name, login, password);
};

const getUserById = async userId => await usersRepo.getUserById(userId);

const updateUser = async (userId, name, login, password) => {
  return await usersRepo.updateUser(userId, name, login, password);
};

const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
