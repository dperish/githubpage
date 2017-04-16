$(document).ready(function() {

    var positions = JSON.parse(localStorage.getItem("positions")) || [];

    $("#clearButton").on("click", function () {
        localStorage.clear();
    });

    $("#loadButton").on("click", function() {
        for(var i = 0; i < positions.length; i++) {
            renderPosition(positions[i]);
        }
    })

    $("#dropButton").on("click", function () {
        navigator.geolocation.getCurrentPosition(function(pos) {

            alert(pos.coords.latitude);
            var position = {
                "latitude": pos.coords.latitude,
                "longitude": pos.coords.longitude,
                "timeStamp": pos.timestamp
            };

            positions.push(position);
            localStorage.setItem("positions", JSON.stringify(positions));
            renderPosition(position);
        });
    });

    function renderPosition(position) {
        $("<li class='list-group-item'>" 
            + position.latitude + ", " + position.longitude 
            + "</li>").appendTo("#positionsList");
    }

});