let newRels = [];
var listPlaying;

let audio = {
    source: document.getElementById('trackSource'),
    control: document.getElementById('track'),
    currentList: [],
    currentIndex: 0
}

function addToNewReleases(song) {
    newRels.push(song);
}

function unhideElements() {
    $("#playercontrolse").show();
}

let recs = [];

function addToNewRecommendations(song) {
    recs.push(song);
}

let genres = [];

function initGenres() {
    genres = [];
}

function addToGenre(song) {
    genres.push(song);
}

var old = 'test';

function play(collection, index) {
    console.log(collection);
    audio.currentIndex = index;
    audio.currentList = collection;
    let song = collection[index];
    audio.source.src = song.songURL;
    audio.control.load();
    audio.control.addEventListener("canplay", function() {
        audio.control.play();
        $('#' + song.songID).addClass("active");
        $('#' + old).removeClass("active");
        old = song.songID;

        $("#endTime").text(getTime(audio.control.duration));
        $("#currentTime").text(getTime(0));
        if (!audio.control.paused) {
            $("#playbutton").hide();
            $("#pausebutton").show();
        }
        audio.control.onended = function() {
            $("#next").click();
        };
    });
}

function seek(value) {
    audio.control.currentTime = audio.control.duration / 200 * value;
}


$("#pausebutton").click(function() {
    audio.control.pause();
    $("#playbutton").show();
    $("#pausebutton").hide();
});

$("#playbutton").click(function() {
    if (audio.control.paused) {
        audio.control.play();
        $("#playbutton").hide();
        $("#pausebutton").show();
    } else {
        if (newRels.length > 0) {
            play(newRels, 0);
        } else if (recs.length > 0) {
            play(recs, 0);
        }

    }
})

function getTime(t) {
    var m = ~~(t / 60),
        s = ~~(t % 60);
    return (m < 10 ? "0" + m : m) + ':' + (s < 10 ? "0" + s : s);
}

function progress() {
    $("#timeSlider").val(200 / audio.control.duration * audio.control.currentTime);
    $("#currentTime").text(getTime(audio.control.currentTime));
}

audio.control.addEventListener("timeupdate", progress, false);

$("#previous").click(function() {
    if (audio.currentIndex - 1 >= 0) {
        play(audio.currentList, audio.currentIndex - 1);
    }
})

$("#next").click(function() {
    if (audio.currentIndex + 1 <= audio.currentList.length - 1) {
        play(audio.currentList, audio.currentIndex + 1);
    } else {
        audio.currentIndex = 0;
        play(audio.currentList, audio.currentIndex);
    }
})