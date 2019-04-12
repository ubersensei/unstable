const logger = require('../../logger/logger');

const SQL = require('sql-template-strings');
const connection = require('./dbConnection');

//-- -----------------------------------------------------
//    -- Schema slingshot_db
//-- -----------------------------------------------------
const drop_schema = SQL`
    DROP SCHEMA IF EXISTS slingshot_db ;
`;

//-- -----------------------------------------------------
//    -- Schema slingshot_db
//-- -----------------------------------------------------
const create_schema = SQL`
    CREATE SCHEMA IF NOT EXISTS slingshot_db DEFAULT CHARACTER SET utf8 ;
`;

const use_schema = SQL`
    USE slingshot_db ;
`;

//-- -----------------------------------------------------
//    -- Table slingshot_db.users
//-- -----------------------------------------------------
const drop_users = SQL`
    DROP TABLE IF EXISTS slingshot_db.users ;
`;

const create_users = SQL`
    CREATE TABLE IF NOT EXISTS slingshot_db.users (
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(255) NULL,
        creation_date DATETIME NULL DEFAULT NOW(),
        PRIMARY KEY (id))
    ENGINE = InnoDB;
`;

//-- -----------------------------------------------------
//    -- Data for table slingshot_db.users
//-- -----------------------------------------------------
const insert_users = SQL`
    INSERT INTO slingshot_db.users (id, name, creation_date) VALUES 
    (DEFAULT, 'admin', NULL),
    (DEFAULT, 'hisaishi', NULL);
`;

const tableActions = [create_schema, use_schema, drop_users, create_users];

const tableActionsNames = ['drop_schema', 'create_schema', 'use_schema', 'drop_users', 'create_users'];


const dataInserts = [insert_users];

module.exports = {
    ddlSQLs: tableActions.map((action, index) => {
        if (tableActionsNames[index].indexOf('drop') === -1) {
            return function(callback) {
                logger.info(`tableAction: `, action);
                connection.query(action, callback);
            };
        } else {
            return function(callback) {
                callback();
            };
        }
    }),
    ddlWithResetSQLs: tableActions.map(action => {
        return function(callback) {
            // logger.info(`tableAction: `, action);
            // console.log(`tableAction: `, action);
            connection.query(action, callback);
        };
    }),
    insertSQLs: dataInserts.map(action => {
        return function(callback) {
            connection.query(action, callback);
        };
    })
};
