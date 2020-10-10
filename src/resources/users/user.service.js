const usersRepo = require('./user.memory.repository');

const getAll = async () => await usersRepo.getAll();

const addUser = (name, login, password) => {
  return usersRepo.addUser(name, login, password);
};

const getUserById = userId => usersRepo.getUserById(userId);

const updateUser = (userId, name, login, password) => {
  return usersRepo.updateUser(userId, name, login, password);
};

const deleteUser = userId => usersRepo.deleteUser(userId);

module.exports = { getAll, addUser, getUserById, updateUser, deleteUser };
