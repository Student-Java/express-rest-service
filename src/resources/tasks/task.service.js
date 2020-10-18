const tasksRepo = require('./task.memory.repository');
const checkExistence = require('../../common/utils/checkExistence');
const checkID = require('../../common/utils/checkID');

const getAllTaksByBoardId = async boardId => {
  return await tasksRepo.getAllTasksByBoardId(checkID(boardId));
};

const addTask = async (
  title,
  order,
  description,
  userId,
  boardId,
  columnId
) => {
  return await tasksRepo.addTask(
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
};

const getTaskById = async (boardId, taskId) => {
  return await checkExistence(
    tasksRepo.getTaskById,
    'TASK',
    checkID(boardId),
    checkID(taskId)
  );
};

const updateTask = async (searchBoardId, taskId, newValues) => {
  return await checkExistence(
    tasksRepo.updateTask,
    'TASK',
    checkID(searchBoardId),
    checkID(taskId),
    newValues
  );
};

const deleteTask = async (boardId, taskId) => {
  return await checkExistence(
    tasksRepo.deleteTask,
    'TASK',
    checkID(boardId),
    checkID(taskId)
  );
};

module.exports = {
  getAllTaksByBoardId,
  addTask,
  getTaskById,
  updateTask,
  deleteTask
};
