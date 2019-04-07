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
    // dbUsers.getUsers(function(err, users) {
    //     if (err) {
    //         next(err);
    //     }
    //     res.send(users);
    // });
    res.send([{"id":1,"fake_name":"admin","creation_date":null},{"id":2,"name":"hisaishi","creation_date":null}]);
});

module.exports = router;
