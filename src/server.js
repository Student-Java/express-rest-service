const {
  promiseRejectHandler,
  uncaughtExceptionHandler
} = require('./middleware/log');
const { PORT } = require('./common/config');
const app = require('./app');

process
  .on('unhandledRejection', promiseRejectHandler)
  .on('uncaughtException', uncaughtExceptionHandler);

app.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
