var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    //render function uses jade files
  //res.render('index', { title: 'Express' });
    res.sendfile("views/lab03.html");
});

module.exports = router;
