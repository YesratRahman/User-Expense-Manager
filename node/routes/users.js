var express = require('express');
var router = express.Router();
var userController = require('../controller/user');

/* GET users listing. */
router.post('/authenticate', userController.authenticate );
router.post('/register', userController.register);

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
