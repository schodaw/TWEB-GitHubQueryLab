/*
 -------------------------------------------------------------------------------
 Laboratoire : 3
 Fichier     : handlebarRenderer.java
 Auteur(s)   : Jollien Dominique et Ngo Dung
 Date        : 30.09.2014

 But         : Script jquery qui utilise la librairie HandleBars pour remplir
                le fichier labo3.html avec les valeurs d'affichage.
 -------------------------------------------------------------------------------
 */
$(document).ready(function(){ 
    var context = { 
        title: "TWEB Labo3", 
        buttonLabel: "chercher"
    };
    
    var source = $("#body-template").html(); 
    var template = Handlebars.compile(source); 
    $('body').html(template(context));
    
    source = $("#head-template").html(); 
    template = Handlebars.compile(source); 
    $('head').append(template(context));
});