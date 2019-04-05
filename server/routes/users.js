const express = require('express');
const router = express.Router();
const dbUsers = require('../lib/db/dbUsers');

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     dbUsers.getUsers(function(err, users) {
//         if (err) {
//             next(err);
//         }
//         res.render('users', { title: 'Users', users: JSON.stringify(users) });
//     });
// });

router.get('/getUsers', function(req, res, next) {
    dbUsers.getUsers(function(err, users) {
        if (err) {
            next(err);
        }
        res.send(users);
    });
});

module.exports = router;
