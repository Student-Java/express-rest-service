const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router
  .route('/')
  .get(async (req, res) => {
    const users = await usersService.getAll();
    res.json(users.map(User.toResponse));
  })
  .post(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.addUser(name, login, password);
    res.json(User.toResponse(user));
  });

router
  .route('/:uid')
  .get(async (req, res) => {
    const user = await usersService.getUserById(req.params.uid);
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
    }
  })
  .put(async (req, res) => {
    const { name, login, password } = req.body;
    const user = await usersService.updateUser(
      req.params.uid,
      name,
      login,
      password
    );
    if (user) {
      res.json(User.toResponse(user));
    } else {
      res.status(404).send('User not found');
    }
  })
  .delete(async (req, res) => {
    const deletedUser = await usersService.deleteUser(req.params.uid);
    if (deletedUser) {
      res.status(204).json(User.toResponse(deletedUser));
    } else {
      res.status(404).send('User not found');
    }
  });

module.exports = router;
