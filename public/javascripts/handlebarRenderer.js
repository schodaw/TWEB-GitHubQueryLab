/*
 -------------------------------------------------------------------------------
 Laboratoire : 3
 Fichier     : handlebarRenderer.js
 Auteur(s)   : Jollien Dominique et Ngo Dung
 Date        : 30.09.2014

 But         : JQuery script using the HandleBars library to fill the file
                labo3.html with display values.
 -------------------------------------------------------------------------------
 */
$(document).ready(function(){ 
    var context = { 
        title: "TWEB Labo3", 
        buttonLabel: "chercher",
        tableHeaderId: "id",
        tableHeaderName: "nom",
        tableHeaderDescription: "déscription",
        tableHeaderOwner: "propriétaire",
        tableHeaderStars: "étoiles"
    };
    
    var source = $("#body-template").html(); 
    var template = Handlebars.compile(source); 
    $('div#container').html(template(context));
    
    source = $("#head-template").html(); 
    template = Handlebars.compile(source); 
    $('head').append(template(context));
});