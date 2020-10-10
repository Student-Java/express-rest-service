const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');

router
  .route('/')
  .get(async (req, res) => {
    res.json(await tasksService.getAllTaksByBoardId(req.params.boardId));
  })
  .post(async (req, res) => {
    const { title, order, description, userId, columnId } = req.body;
    res.json(
      await tasksService.addTask(
        title,
        order,
        description,
        userId,
        req.params.boardId,
        columnId
      )
    );
  });

router
  .route('/:taskId')
  .get(async (req, res) => {
    const task = await tasksService.getTaskById(
      req.params.boardId,
      req.params.taskId
    );
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found.');
    }
  })
  .put(async (req, res) => {
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
    if (task) {
      res.json(task);
    } else {
      res.status(404).send('Task not found.');
    }
  })
  .delete(async (req, res) => {
    const deletedtask = await tasksService.deleteTask(
      req.params.boardId,
      req.params.taskId
    );
    if (deletedtask) {
      res.status(204).json(deletedtask);
    } else {
      res.status(404).send('Task not found.');
    }
  });

module.exports = router;
