var express = require('express');
var router = express.Router();
var userService = require('../services/user');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//An example of how to set up a route that requires
//the user to be authenticated in any way
router.get('/foo', (req, res, next) =>
    {
        userService.isAuthenticated(req, res, function () {
                res.send("You are authenticated!");
            }
        );
    });

module.exports = router;
