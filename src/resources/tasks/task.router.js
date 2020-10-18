const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const { OK, NO_CONTENT } = require('http-status-codes');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      const resValue = await tasksService.getAllTaksByBoardId(
        req.params.boardId
      );
      res.status(OK).json(resValue);
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { title, order, description, userId, columnId } = req.body;
      const resValue = await tasksService.addTask(
        title,
        order,
        description,
        userId,
        req.params.boardId,
        columnId
      );
      res.status(OK).json(resValue);
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:taskId')
  .get(async (req, res, next) => {
    try {
      const task = await tasksService.getTaskById(
        req.params.boardId,
        req.params.taskId
      );
      res.status(OK).json(task);
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { title, order, description, userId, boardId, columnId } = req.body;
      const task = await tasksService.updateTask(
        req.params.boardId,
        req.params.taskId,
        {
          title,
          order,
          description,
          userId,
          boardId,
          columnId
        }
      );
      res.status(OK).json(task);
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const deletedtask = await tasksService.deleteTask(
        req.params.boardId,
        req.params.taskId
      );
      res.status(NO_CONTENT).json(deletedtask);
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
