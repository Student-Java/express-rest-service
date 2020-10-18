const boardsRepo = require('./board.memory.repository');
const checkExistence = require('../../common/utils/checkExistence');
const checkID = require('../../common/utils/checkID');

const getAllBoards = async () => await boardsRepo.getAllBoards();

const addBoard = async (title, columns) => {
  return await boardsRepo.addBoard(title, columns);
};

const getBoardById = async boardId => {
  return await checkExistence(
    boardsRepo.getBoardById,
    'BOARD',
    checkID(boardId)
  );
};

const updateBoard = async (boardId, title, columns) => {
  return await checkExistence(
    boardsRepo.updateBoard,
    'BOARD',
    checkID(boardId),
    title,
    columns
  );
};
const deleteBoard = async boardId => {
  return await checkExistence(
    boardsRepo.deleteBoard,
    'BOARD',
    checkID(boardId)
  );
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
