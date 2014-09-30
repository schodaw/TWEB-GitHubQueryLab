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
        ev.preventDefault();
        $.getJSON("/search", "query=" + $("#searchQuery").val(), function( data ) {
            alert('done');
            $("#result").text(JSON.stringify(data));
        });
    });
});