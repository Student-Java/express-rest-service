const winston = require('winston');
const expressWinston = require('express-winston');
const { HttpError, InternalServerError } = require('http-errors');
require('winston-daily-rotate-file');
const { exit } = process;

const eventLogOptions = {
  console: {
    level: 'debug',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `${info.timestamp}: ${info.message}`)
    ),
    colorize: true
  },
  file: {
    level: 'info',
    filename: '%DATE%.log',
    format: winston.format.combine(
      winston.format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
      }),
      winston.format.printf(info => `${info.timestamp}: ${info.message}`)
    )
  }
};

const eventLog = winston.createLogger({
  transports: [
    new winston.transports.Console(eventLogOptions.console),
    new winston.transports.DailyRotateFile(eventLogOptions.file)
  ],
  meta: false
});

const expresseventLog = expressWinston.logger({
  winstonInstance: eventLog,
  statusLevels: true,
  meta: false,
  msg:
    '({{res.statusCode}}) {{req.method}}: {{req.path}}, query params: {{JSON.stringify(req.query)}}, request body: {{JSON.stringify(req.body)}}'
});

const errorLog = expressWinston.errorLogger({
  winstonInstance: eventLog,
  meta: false,
  statusLevels: true,
  dumpExceptions: true,
  showStack: true,
  msg:
    '({{err.statusCode}}) {{req.method}}: {{req.path}}, query params: {{JSON.stringify(req.query)}}, request body: {{JSON.stringify(req.body)}}, message: {{err.message}}',
  skip: (req, res, err) => err && err instanceof HttpError
});

const errorHandler = (err, req, res, next) => {
  if (err && err instanceof HttpError) {
    res.status(err.statusCode).json(err.message);
    return;
  }
  errorLog(err, req, res, next);
  err = new InternalServerError();
  res.status(err.statusCode).json(err.message);
};

const promiseRejectHandler = err => {
  eventLog.log({
    level: 'error',
    message: `uncaughtException: promise rejection ${err.message}, stack: ${err.stack}`
  });
};

const uncaughtExceptionHandler = err => {
  eventLog.log({
    level: 'error',
    message: `uncaughtException: ${err.message}, stack: ${err.stack}`
  });
  eventLog.on('finish', () => exit(1));
};

module.exports = {
  expresseventLog,
  errorHandler,
  promiseRejectHandler,
  uncaughtExceptionHandler
};
