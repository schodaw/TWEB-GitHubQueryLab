var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    //render function uses jade files
  //res.render('index', { title: 'Express' });
    res.sendfile("views/lab03.html");
});


//test the github query functionality
router.get('/search', function(req, res) {
    res.send(req.query);
    //res.send(gitHubRepositoryResearch(req.query));
});

module.exports = router;
