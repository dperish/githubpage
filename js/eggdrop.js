$(document).ready(function() {

    var positions = JSON.parse(localStorage.getItem("positions")) || [];

    $("#dropButton").on("click", function () {

        navigator.geolocation.getCurrentPosition(function(pos){
            positions.push(pos);
            
            $("<li class='list-group-item'>" 
                + pos.coords.latitude + ", " + pos.coords.longitude 
                + "</li>").appendTo("#positionsList");

        });

    });

});