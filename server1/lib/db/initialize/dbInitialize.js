const async = require('async');
const connection = require('./dbConnection');
const logger = require('../../logger/logger');
const SQL = require('sql-template-strings');
const initialSQLs = require('./sourceTables');

function useDB(done) {
    connection.query(SQL(`USE slingshot_db ;`), function(err, result) {
        if (err) {
            logger.error('Exception in using slingshot_db db and tables');
            throw err;
        } else {
            logger.info('Now using slingshot_db database and tables');
            if (done) {
                done();
            }
        }
    });
}

function createDB(options, done) {
    async.series(options.reset ? initialSQLs.ddlWithResetSQLs : initialSQLs.ddlSQLs, function(err, results) {
        if (err) {
            logger.error('Exception in re-creating slingshot_db db and tables');
            throw err;
        } else {
            logger.info('Completed re-creating slingshot_db db and tables');
            if (done) {
                done();
            }
        }
    });
}

function addInitialData(doneCB) {
    async.series(initialSQLs.insertSQLs, function(err, results) {
        if (err) {
            logger.info('Exception in adding initial data', err);
            throw err;
        } else {
            logger.info('Finished adding initial minimal data for testing');
            if (doneCB) {
                doneCB();
            }
        }
    });
}

module.exports = function() {
    return {
        useDB: useDB,
        createDB: createDB,
        addInitialData: addInitialData
    };
};
