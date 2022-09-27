function createElement(song, index) {
    let date = song.releaseDate.toDate().toDateString();
    let year = date.substring(date.length - 4, date.length);

    var _string =
        `
   <div class="col-md-6">
    <div class="latest-release-song">
     <div class="latest-release-img-container" id="${song.songID}">
      <img class="latest-release-img" src="${song.coverURL}"/>
         <i class="fas fa-play"></i>
     </div>
     <div class="latest-song-details">
      <h5>${titleCase(song.artistName)}</h5>
      <h5>${titleCase(song.songTitle)}</h5>
      <p>${year}</p>
                        </div>
                        <div class="latest-release-utility">
                            <div class="flap-container">
                                <span><i class="fas fa-ellipsis-h"></i></span>
                         
                            </div>
                            <p>${song.key}</p>
                        </div>
                    </div>
                   
                  
    `;
    $('#latest-row').append(_string);
    $('#' + song.songID).click(function() {
        unhideElements();
        play(newRels, index);
    })

}
let index = 0;
firebase.firestore().collection("songs").orderBy("releaseDate", 'desc').limit(25)
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            if (doc.exists) {
                // Convert to City object
                var city = doc.data();
                $("#spinnerLatest").hide();
                if (index <= 3) {
                    createElement(city, index);
                    addToNewReleases(city);
                    index++;
                }
            } else {
                console.log("No such document!")
            }

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });