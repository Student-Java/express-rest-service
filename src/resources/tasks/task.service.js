const tasksRepo = require('./task.memory.repository');

const getAllTaksByBoardId = boardId => tasksRepo.getAllTasksByBoardId(boardId);

const addTask = (title, order, description, userId, boardId, columnId) => {
  return tasksRepo.addTask(
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  );
};

const getTaskById = (boardId, taskId) => tasksRepo.getTaskById(boardId, taskId);

const updateTask = (searchBoardId, taskId, newValues) => {
  return tasksRepo.updateTask(searchBoardId, taskId, newValues);
};

const deleteTask = (boardId, taskId) => tasksRepo.deleteTask(boardId, taskId);

module.exports = {
  getAllTaksByBoardId,
  addTask,
  getTaskById,
  updateTask,
  deleteTask
};
