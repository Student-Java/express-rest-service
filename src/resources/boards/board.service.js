const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();
const addBoard = (title, columns) => boardsRepo.addBoard(title, columns);
const getBoardById = boardId => boardsRepo.getBoardById(boardId);
const updateBoard = (boardId, title, columns) => {
  return boardsRepo.updateBoard(boardId, title, columns);
};
const deleteBoard = boardId => boardsRepo.deleteBoard(boardId);

module.exports = {
  getAllBoards,
  addBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
