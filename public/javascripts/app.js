$(document).ready(function() {
     var request =  $.ajax({
          url: 'http://localhost:3000',
          type: 'GET',
          dataType: 'json',
          contentType: "application/json",
          success: function(data){
            $(request.responseJSON).each(function(x,y){
              $("#show").append("<p>"+ y.city + y.race + y["hit_killed?"] + "</p>");
              // $.post(blah, function(result) {
              //
              //      });
            });
          }
        })
});
