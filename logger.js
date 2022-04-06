const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    winston.format.colorize(),
    winston.format.printf(function (log) {
      return `[${log.level} - ${log.timestamp}] - ${log.message}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      prettyPrint: true,
      colorize: true,
      silent: false,
      timestamp: true
    })
  ]
});

module.exports = logger;