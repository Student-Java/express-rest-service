const Task = require('./task.model');

const tasksDB = [];

const getAllTasksByBoardId = async boardId => {
  return await tasksDB.filter(el => el.boardId === boardId);
};

const addTask = async (
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  const newTask = new Task({
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  });
  tasksDB.push(newTask);
  return newTask;
};

const getTaskById = async (boardId, taskId) => {
  return tasksDB.find(el => el.id === taskId && el.boardId === boardId);
};

const updateTask = async (searchBoardId, taskId, newValues) => {
  const foundTask = tasksDB.find(
    el => el.id === taskId && el.boardId === searchBoardId
  );
  if (foundTask) {
    Object.assign(foundTask, newValues);
  }
  return foundTask;
};

const deleteTask = async (boardId, taskId) => {
  const foundIdx = tasksDB.findIndex(
    el => el.id === taskId && el.boardId === boardId
  );
  if (foundIdx >= 0) {
    return tasksDB.splice(foundIdx, 1);
  }
  return false;
};

const deleteByBoardId = async boardId => {
  let foundIdx = tasksDB.findIndex(el => el.boardId === boardId);
  while (foundIdx > -1) {
    tasksDB.splice(foundIdx, 1);
    foundIdx = tasksDB.findIndex(el => el.boardId === boardId);
  }
};

const resetUser = async userId => {
  tasksDB.filter(el => el.userId === userId).forEach(el => (el.userId = null));
};

module.exports = {
  getAllTasksByBoardId,
  addTask,
  getTaskById,
  updateTask,
  deleteTask,
  deleteByBoardId,
  resetUser
};
