function createListElement(song, index) {
    var _string =
        `
        <tr id="${song.songID}"> 
        <th scope="row"><div class="imagecontainer"><img class="playlistimg" src="${song.coverURL}"><i class="fas fa-play"></i></div></th>
                <td>${titleCase(song.songTitle)}</td>
                <td>${titleCase(song.albumTitle)}</td>
                <td>${titleCase(song.artistName)}</td>
            </tr>           
    `;

    $('#table').append(_string);
    $('#' + song.songID).click(function() {
        unhideElements();
        play(genres, index);
    })
}
let indexPlaylist = 0;

function getGenre(genreValue) {
    initGenres();
    console.log(genreValue);
    firebase.firestore().collection("songs").where("genre", "==", genreValue)
        .get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    // Convert to City object
                    var song = doc.data();
                    console.log(song);
                    createListElement(song, indexPlaylist);
                    addToGenre(song);
                    indexPlaylist++;
                } else {
                    console.log("No such document!")
                }
            });
        })
        .catch(function(error) {
            console.log("Error getting documents: ", error);
        });
}