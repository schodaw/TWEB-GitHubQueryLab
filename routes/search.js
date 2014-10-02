var express = require('express');
var router = express.Router();

//test the github query functionality
router.get('/search', function(req, res) {
    gitHubRepositoryResearch(req.param("query"), function(result) {
	   res.send(result);
    });
});

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

/**
* Preform a search query for Git repositories by using the GitHub API via the github node.js module
* researchQuery : queyword for repository search
* resultGetterFunction : callback function to process the JSON data returned by the function
**/
function gitHubRepositoryResearch(researchQuery, resultGetterFunction){
    
    //send the query to github
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
                                   pushed_at: repo.pushed_at,
                                   stars: repo.stargazers_count
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