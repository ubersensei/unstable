const logger = require('../../logger/logger');
const mysql = require('mysql');
const dbConfig = require('../../../config/config').dbConfig;

let connection = mysql.createPool(dbConfig);
// let connection = mysql.createConnection(dbConfig);
connection.on('error', function(err) {
    logger.info('database connection lost, error.code: ', err.code);
});

module.exports = connection;
