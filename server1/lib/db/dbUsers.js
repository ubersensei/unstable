let connection = require('./initialize/dbConnection');
const SQL = require('sql-template-strings');
const config = require('../../config/config');

function getUsers(fn) {
    const query = SQL`
        select * from slingshot_db.users
    `;
    connection.query(query, function(err, users) {
        return fn(err, users);
    });
}

module.exports.getUsers = getUsers;
