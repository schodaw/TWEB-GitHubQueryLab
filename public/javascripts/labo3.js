/*
 -------------------------------------------------------------------------------
 Laboratoire : 3
 Fichier     : labo3.js
 Auteur(s)   : Jollien Dominique et Ngo Dung
 Date        : 30.09.2014

 But         : JQuery script thant implement the AJAX functionnality of labo3.html
 -------------------------------------------------------------------------------
 */
$(document).ready(function(){
    $("#searchButton").click(function(){
        $.getJSON("/search", "query=" + $("#searchQuery").val(), function( data ) {
            alert('done');
            $("#result").text(JSON.stringify(data));
        });
        
        /*
        var test = $.ajax({
            url: "/search",
            crossDomain: "true"
            //?query=" + $("#searchQuery").val(),
            //dataType: 'json',
            data: {
                query: 'tetris'
            }
        }).done(function() {
            alert('done');
        }).fail(function(xhr,status,error) {
            alert('error' + xhr + status + error);
            
        }).responseText;
        */
    });
    /*
    var	repositories = jQuery.parseJSON(	
                            jQuery.ajax({	
                                //url: "./search?query=" + $("#searchQuery").val(),
                                url: "tweb-lab03-test-githubapi.herokuapp.com/search?query=" + $("#searchQuery").val(),
                                dataType: 'json'	
                            }).responseText
                        ).rooms;
    */	
});