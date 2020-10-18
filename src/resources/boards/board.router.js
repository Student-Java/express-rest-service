const router = require('express').Router();
const boardsService = require('./board.service');
const tasksRouter = require('../tasks/task.router');
const { OK, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const boards = await boardsService.getAllBoards();
      res.status(OK).json(boards);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { title, columns } = req.body;
      const newBoard = await boardsService.addBoard(title, columns);
      res.status(OK).json(newBoard);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:boardId')
  .get(async (req, res, next) => {
    try {
      const board = await boardsService.getBoardById(req.params.boardId);
      res.status(OK).json(board);
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { title, columns } = req.body;
      const board = await boardsService.updateBoard(
        req.params.boardId,
        title,
        columns
      );
      res.status(OK).json(board);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedBoard = await boardsService.deleteBoard(req.params.boardId);
      res.status(NO_CONTENT).json(deletedBoard);
    } catch (error) {
      return next(error);
    }
  });
router.use('/:boardId/tasks', tasksRouter);

module.exports = router;
