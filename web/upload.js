var firebaseConfig = {
    apiKey: "AIzaSyD7TCPlQ9Zr_IeSzx8wLdhkPN4SUbrZitc",
    authDomain: "artifex-a904f.firebaseapp.com",
    databaseURL: "https://artifex-a904f.firebaseio.com",
    projectId: "artifex-a904f",
    storageBucket: "artifex-a904f.appspot.com",
    messagingSenderId: "212647390348",
    appId: "1:212647390348:web:18a0f20722b43f95dbdfa9",
    measurementId: "G-VHVGZVGED9"
};

var app = firebase.initializeApp(firebaseConfig);
db = firebase.firestore(app);  
var auth = firebase.auth();

//Listens for changes on the genre select
document.addEventListener('DOMContentLoaded', function () {
    var genre = document.getElementById("genre");
    if (localStorage['genre']) { // if job is set
        genre.value = localStorage['genre']; // set the value
    }
    genre.onchange = function () {
         localStorage['genre'] = this.value; // change localStorage on change
     }
 });
//Listens for changes in explicit select
 document.addEventListener('DOMContentLoaded', function () {
    var explicit = document.getElementById("explicit");
    if (localStorage['explicit']) { // if job is set
        explicit.value = localStorage['explicit']; // set the value
    }
    explicit.onchange = function () {
         localStorage['explicit'] = this.value; // change localStorage on change
     }
 });

function uploadMusicData(){
    var albumTitle = document.getElementById("albumTitle").value;
    var artist = document.getElementById("artist").value;
    var cover = document.getElementById("cover").value;

    //var genre = document.getElementById('genre').value;
    var songTitle = document.getElementById("songTitle").value;
    var music = document.getElementById("music").value;
    var releaseDate = document.getElementById("releaseDate").value;
    var songID = "";

    var explicit = document.getElementById("").value
}


//.doc(auth.currentUser.uid)
async function createSongDocumentInFirestore(albumTitle, artist, cover, explicit, genre, songID, songTitle, music) { 
    db.collection('song').doc().set(
        {
            'albumTitle': albumTitle,
            'artistName': artist,
            'coverURL': cover,
            'explicit': explicit,
            'genre': genre,
            'songID': /*song ID has to be the same as the newly generated doc()*/ songID,
            'songTitle': songTitle,
            'songURL':  music
        }
    )

}

function validateFormUpload(){
    var isValid = false;
    var counter = 0;



    if(counter > 0){
        isValid = false;
    }
    else{
        isValid = true;
    }
    return isValid;
}

/*function loadSettings() {
    if (localStorage['genre']) {
        input.value = localStorage['genre'];
    }
}

function saveSettings() {
    localStorage['genre'] = input.value;
}*/