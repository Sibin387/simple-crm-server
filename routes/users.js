var express = require('express');
var router = express.Router();
const users = require('../controllers/users');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/test', function(req, res, next) {
  res.send('respond with a test1');
});

router.post('/register', users.register);
router.get('/chart', users.showChart);
router.post('/login', users.login);
router.post('/createEnquiry', users.createEnquiry);
router.get('/enquiries/search', users.getEnquiry);

module.exports = router;
