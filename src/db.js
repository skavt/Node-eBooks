const mysql = require('mysql');
const logger = require('./logger');

logger.info('Connecting to db');
const db = {
  connection: null
};

function createConnection() {
  db.connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    charset: 'UTF8MB4_UNICODE_CI'
  });

  db.connection.connect(function (err) {
      if (err) {
        const retryMilliseconds = 2000;

        logger.error('Error connecting to database: ' + err.stack);
        logger.info('Will retry to connect to mysql database in ' + retryMilliseconds + ' milliseconds');

        setTimeout(createConnection, retryMilliseconds);
        return;
      }
      logger.info('Connected with connection id ' + db.connection.threadId);
    }
  );

  db.connection.on('error', function (err) {
    logger.error('Error on mysql connection: ' + err.stack);
    logger.error('Error Code: ' + err.code);
    setTimeout(function () {
      createConnection();
    }, 1000);
  });
}

createConnection();

module.exports = db;
