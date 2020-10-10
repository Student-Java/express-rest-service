const Board = require('./board.model');
const Column = require('./column/column.model');
const tasksRepo = require('../tasks/task.memory.repository');

const BoardsDB = [];

const getAllBoards = async () => {
  return BoardsDB;
};

const addBoard = async (title, columnsArr) => {
  const columns = columnsArr.map(el => new Column(el));
  const newboard = new Board({ title, columns });
  BoardsDB.push(newboard);
  return newboard;
};

const getBoardById = async boardId => {
  return BoardsDB.find(el => el.id === boardId);
};

const updateBoard = async (boardId, title, columnsArr) => {
  const board = BoardsDB.find(el => el.id === boardId);
  if (board) {
    board.title = title !== undefined ? title : board.title;
    board.columns = columnsArr.map(el => new Column(el));
  }
  return board;
};

const deleteBoard = async boardId => {
  const boardIdx = BoardsDB.findIndex(el => el.id === boardId);
  if (boardIdx >= 0) {
    await tasksRepo.deleteByBoardId(boardId);
    return BoardsDB.splice(boardIdx, 1);
  }
  return false;
};

module.exports = {
  getAllBoards,
  addBoard,
  getBoardById,
  updateBoard,
  deleteBoard
};
