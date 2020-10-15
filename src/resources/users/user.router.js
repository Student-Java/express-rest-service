const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res, next) => {
    try {
      res.status(OK).json((await usersService.getAll()).map(User.toResponse));
    } catch (error) {
      return next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, login, password } = req.body;
      res
        .status(OK)
        .json(
          User.toResponse(await usersService.addUser(name, login, password))
        );
    } catch (error) {
      return next(error);
    }
  });

router
  .route('/:uid')
  .get(async (req, res, next) => {
    try {
      res
        .status(OK)
        .json(User.toResponse(await usersService.getUserById(req.params.uid)));
    } catch (error) {
      return next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { name, login, password } = req.body;
      res
        .status(OK)
        .json(
          User.toResponse(
            await usersService.updateUser(req.params.uid, name, login, password)
          )
        );
    } catch (error) {
      return next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      res
        .status(NO_CONTENT)
        .json(await usersService.deleteUser(req.params.uid));
    } catch (error) {
      return next(error);
    }
  });

module.exports = router;
