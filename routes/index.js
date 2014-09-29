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
    gitHubRepositoryResearch(req.query, function(result) {
	   res.send(result);
    });
});

//TODO : mettre fonction dans un autre fichier ?
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

function gitHubRepositoryResearch(researchQuery, resultGetterFunction){
    
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

			transformedJSONData = {};
            transformedJSONData.count = res.total_count;
            transformedJSONData.repositories = repositories;
			
            //sending the result to a callback function
			resultGetterFunction(transformedJSONData);
        }
    );
}

module.exports = router;
