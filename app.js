var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;


//github query
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    debug: true,
    protocol: "https",
    host: "api.github.com",
    //pathPrefix: "", // for some GHEs
    timeout: 5000
});


function gitHubRepositoryResearch(researchQuery){
    var transformedJSONData = {};
    
    github.search.repos(
        {q: researchQuery},
        function(err, res) {

            //extracting the request result given as json
            var repositories = [];
            res.items.forEach(function(repo) {
                repositories.push({id: repo.id,
                                   name: repo.name,
                                   full_name: repo.full_name,
                                   owner: {
                                       login: repo.owner.login,
                                       avatar_url: repo.owner.avatar_url,
                                       url:	repo.owner.url,
                                       html_url: repo.owner.html_url,
                                   },
                                   html_url: repo.html_url,	
                                   description: repo.description,	
                                   url: repo.url,
                                   created_at: repo.created_at,
                                   updated_at: repo.updated_at,
                                   pushed_at: repo.pushed_at//,
                                   //stars: repo.stars
                                  });
            });

            transformedJSONData.count = res.total_count;
            transformedJSONData.repositories = repositories;
        }
    );
    
    return transformedJSONData
}