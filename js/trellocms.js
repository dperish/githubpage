
// boards: https://trello.com/b/jmzm4mzE/links  [jmzm4mzE]
// list: https://api.trello.com/1/lists/58b2e1e0a23501c2b9a895f7/cards [58b2e1e0a23501c2b9a895f7]

(function ($, app) {

    var _trelloDs = {};

    _trelloDs.get = function (boardId, fn){
        $.getJSON("https://api.trello.com/1/boards/" + boardId + "/lists?cards=open", fn);
    };

    window.trelloDs = window.trelloDs || _trelloDs;

}(jQuery, app || {}));


$(document).ready(function() {

    var boardId = "jmzm4mzE";
    trelloDs.get(boardId, function (data) { parseData(data); });

    function parseData(data) {

        for (var i = 0; i < data.length; i += 1) {
            var board = data[i];
            var category = board.name;

            if (!board.cards || board.cards.length === 0) {
                continue;
            }
            
            board.cards
                .map(function (card) { 
                    return { 
                        "title": card.name, 
                        "url": 
                            (card.desc) 
                                ? card.desc.split("\n")[0]
                                : "",
                        "image": 
                            (card.desc.indexOf("\n") > -1) 
                                ? card.desc.split("\n")[1]
                                : "",
                        "color": 
                            (card.labels && card.labels.length !== 0 && card.labels[0].color) 
                                ? card.labels[0].color : 
                                "black" };
                        })
                .forEach(function (cardVm) {
                    renderContent(
                        category, 
                        cardVm.title, 
                        cardVm.url, 
                        cardVm.color,
                        cardVm.image);
                });
        }

    }

    function renderContent(category, title, url, color, image) {

        if (!category || !title) { return; }

        url = url || "#";
        color = color || "black"
        image = image || "";

        var favicon = "";

        if (url.indexOf("//") > -1) {
            favicon = url.split("/")[0] + "//" + url.split("/")[2] + "/favicon.ico";
        }

        switch (category) {
            case "TopHeadline":
                $("<a href='" + url + "' style='color:" + color + "' target='_blank'>" + 
                  ((image) ? "<img src='" + image + "'><br>" : "")    +               
                  "    <strong>" + title + "</strong></a><br>")
                .appendTo("#" + category);
                break;
            case "MainHeadline":
                $(((image) ? "<img src='" + image + "' class='img-responsive center-block'><br>" : "") +
                  "  <a href='" + url + "' style='color:" + color + "; display: block;' class='text-center' target='_blank'>" + 
                  "    <strong>" + title + "</strong></a>")
                .appendTo("#" + category);
                break;
            default:
                $("<li class='list-group-item' style='border-left: none; border-right: none; padding: 4px;'>" + 
                  ((image) ? "<img src='" + image + "' class='img-responsive'><br>" : "") +
                  "  <a href='" + url + "' style='color:" + color + "' target='_blank'>" + 
                  ((favicon) ? "  <img src='"+ favicon + "' style='width: 16px;' />" : "<span style='display: inline-block; min-width: 24px;'></span>" ) +
                  "    <strong>" + title + "</strong></a></li>")
                .appendTo("#" + category);
                break;
        }
    }

});
