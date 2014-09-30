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
    $("#searchButton").click(function(){
        //prevent default handling of the event
        //we do that so that the page is not refreshed which would erase the content of the result <p> we just put with AJAX
        event.preventDefault();
        
        //perform a resarch of Git repositories by doing an AJAX query on /search
        //this method doesn't work on cross-domain url
        $.getJSON("/search", "query=" + $("#searchQuery").val(), function( data ) {
            $("#result").text(JSON.stringify(data));
        });
    });
});