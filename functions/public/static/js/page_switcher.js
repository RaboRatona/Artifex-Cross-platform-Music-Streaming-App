function toGenres() {
    $("#container").remove();
    $("main").load("genre.html");
}

function toPlaylist(value) {
    $("#container").remove();
    $("main").load("playlist.html", null, function() {
        $.getScript("./static/js/playlist.js").done(function(script, textStatus) {
            getGenre(value);
        });;


    });
}

function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // You do not need to check if i is larger than splitStr length, as your for does that for you
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    // Directly return the joined string
    return splitStr.join(' ');
}