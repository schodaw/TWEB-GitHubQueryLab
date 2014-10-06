/*
 -------------------------------------------------------------------------------
 Laboratoire : 3
 Fichier     : labo3.js
 Auteur(s)   : Jollien Dominique et Ngo Dung
 Date        : 30.09.2014

 But         : JQuery script thant implement the AJAX functionnality of labo3.html
 -------------------------------------------------------------------------------
 */
$(function(){
    
    var context = { 
        tableHeaderId: "id",
        tableHeaderName: "nom",
        tableHeaderDescription: "description",
        tableHeaderOwner: "propriétaire",
        tableHeaderStars: "étoiles"
    };

    //getting the handlebar templates for github research queries
    var resultHeaderSource = $("#result-header-template").html()
    var resultHeaderTemplate = Handlebars.compile(resultHeaderSource); 
    $('tr#result-header').html(resultHeaderTemplate(context));
    
    var resultSource = $("#result-template").html();
    var resultTemplate = Handlebars.compile(resultSource);
    
    $("#searchButton").click(function(){
        //prevent default handling of the event
        //we do that so that the page is not refreshed which would erase the content of the result <p> we just put with AJAX
        event.preventDefault();
        
        //perform a resarch of Git repositories by doing an AJAX query on /search
        //this method doesn't work on cross-domain url
        $.getJSON("/search", "query=" + $("#searchQuery").val(), function( data ) {
            
            //use handlebars to put the query result in the UI
            //$('table#result').html("");
            
            data.repositories.forEach(function(repo) {
                $('table#result').html($('table#result').html() + resultTemplate(repo));
            });
        });
    });
});