$(document).ready(function() {
    setInterval(function () {
        document.location.reload();
    }, 120000);
});

briefcase.getJSON({
    id: "1dBgx1A9_gA_3c_rKC5IpsvLj6ubQY_1Q0Ee51QPOZ-4",
    leftColumnTitle: "category"
}, printElements);

function printElements(data) {

    data.forEach(function (item) {

        var category = item.title;
        var title = item.categories.filter(function (x) { if (x.name == "title") { return x; } })[0].value;
        var url = item.categories.filter(function (x) { if (x.name == "url") { return x; } })[0].value;
        var color = item.categories.filter(function (x) { if (x.name == "color") { return x; } })[0].value;
        var image = item.categories.filter(function(x) { if (x.name == "image") { return x; } })[0].value;
        
        switch (category) {
            case "TopHeadline":
                $("<a href='" + url + "' style='font-family: monospace; text-decoration: underline; color:" + color + "' target='_blank'>" + 
                  ((image) ? "<img src='" + image + "' style='max-width: 320px;'><br>" : "")    +               
                  "    <strong>" + title + "</strong></a><br>")
                .appendTo("#" + category);
                break;
            case "MainHeadline":
                $(((image) ? "<img src='" + image + "' class='img-responsive center-block'><br>" : "") +
                  "  <center><a href='" + url + "' class='text-center' style='font-size: 3em; text-decoration: underline; font-family: sans-serif; color:" + color + "' target='_blank'>" + 
                  "    <strong>" + title + "</strong></a></center>")
                .appendTo("#" + category);
                break;
            default:
                $("<li class='list-group-item' style='border-left: none; border-right: none; padding: 4px;'>" + 
                  ((image) ? "<img src='" + image + "' style='max-width: 320px;'><br>" : "") +
                  "  <a href='" + url + "' style='font-family: monospace; text-decoration: underline; color:" + color + "' target='_blank'>" + 
                  "    <strong>" + title + "</strong></a></li>")
                .appendTo("#" + category);
                break;
        }

    });

}
