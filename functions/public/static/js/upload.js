var uid;

function validateNotNullOrEmpty(string) {
    if (isMyStringNull(string) == false && isMyStringEmpty(string) == false) {
        return true;
    } else {
        return false;
    }
}

function validateName(name) {
    if (validateNotNullOrEmpty(name) &&
        doesMyStringContainOnlyLetters(name) == true) {
        return true;
    } else {
        return false;
    }
}

function validateArtistName() {
    let strName = $("#artistName").val();
    if (validateNotNullOrEmpty(strName)) {
        $("#artistName").removeClass("is-invalid");
        return strName;
    } else {
        $("#errorArtistName").text("Please enter a valid Artist Name");
        $("#artistName").addClass("is-invalid");
        return false;
    }
}

function validateAlbumTitle() {
    let strATitle = $("#albumTitle").val();
    if (validateNotNullOrEmpty(strATitle)) {
        $("#albumTitle").removeClass("is-invalid");
        return strATitle;
    } else {
        $("#errorAlbumTitle").text("Please enter a valid Album Title");
        $("#albumTitle").addClass("is-invalid");
        return false;
    }
}

function validateCoverURL() {
    let strCover = $("#coverURL").val();
    if (validateNotNullOrEmpty(strCover)) {
        $("#coverURL").removeClass("is-invalid");
        return strCover;
    } else {
        $("#coverURL").css("text-color", "red");
        $("#errorCoverURL").text("Invalid Cover Image");
        $("#coverURL").addClass("is-invalid");
        return false;
    }
}

function validateGenre() {
    let strGenre = $("#genre").val();
    if (validateNotNullOrEmpty(strGenre)) {
        $("#genre").removeClass("is-invalid");
        return strGenre;
    } else {
        $("#errorGenre").text("Please select a Genre");
        $("#genre").addClass("is-invalid");
        return false;
    }
}

function validateExplicitRating() {
    let strExp = $("#explicitRating").val();
    if (validateNotNullOrEmpty(strExp)) {
        $("#explicitRating").removeClass("is-invalid");
        return strExp;
    } else {
        $("#errorExplicitRating").text("Please select an Explicit Rating");
        $("#explicitRating").addClass("is-invalid");
        return false;
    }
}

function validateSongTitle() {
    let strSTitle = $("#songTitle").val();
    if (validateNotNullOrEmpty(strSTitle)) {
        $("#songTitle").removeClass("is-invalid");
        return strSTitle;
    } else {
        $("#errorSongTitle").text("Please enter a valid Song Title");
        $("#songTitle").addClass("is-invalid");
        return false;
    }
}

function validateSongURL() {
    if ($("#songURL").val()) {
        $("#songURL").removeClass("is-invalid");
        return true;
    } else {
        $("#songURL").css("text-color", "red");
        $("#errorSongURL").text("Invalid File");
        $("#songURL").addClass("is-invalid");
        return false;
    }
}

function validateBPM() {
    let strBPM = $("#bpm").val();
    if (validateNotNullOrEmpty(strBPM) && doesMyStringContainOnlyNumbers(strBPM) == true &&
        strBPM >= 10) {
        $("#bpm").removeClass("is-invalid");
        return strBPM;
    } else {
        $("#errorBPM").text("Please enter a valid song BPM");
        $("#bpm").addClass("is-invalid");
        return false;
    }
}

function validateReleaseDate() {
    let strRDate = $("#releaseDate").val();
    if (validateNotNullOrEmpty(strRDate) &&
        strRDate !== "yyyy/mm/dd") {
        $("#releaseDate").removeClass("is-invalid");
        return strRDate;
    } else {
        $("#errorReleaseDate").text("Please select the Release Date");
        $("#releaseDate").addClass("is-invalid");
        return false;
    }
}

function validateSongKey() {
    let strKey = $("#songKey").val();
    if (validateNotNullOrEmpty(strKey) &&
        doesMyStringContainOnlyLetters(strKey) == true &&
        strKey.length <= 2) {
        $("#songKey").removeClass("is-invalid");
        return strKey;
    } else {
        $("#errorSongKey").text("Please enter a valid Song Key");
        $("#songKey").addClass("is-invalid");
        return false;
    }
}

function completeSongUpload(artistName, albumTitle, coverURL, genre, explicit, songTitle, songURL, bpm, releaseDate, key) {
    let db = firebase.firestore();
    let songRef = db.collection('songs').doc();
    console.log(coverURL);
    console.log(songURL);


    songRef.set({
        albumTitle: albumTitle.toLowerCase(),
        artistName: artistName.toLowerCase(),
        bpm: bpm,
        coverURL: coverURL,
        createdBy: uid,
        explicit: explicit,
        genre: genre.toLowerCase(),
        key: key.toLowerCase(),
        releaseDate: firebase.firestore.Timestamp.fromDate(new Date(releaseDate)),
        songID: songRef.id,
        songTitle: songTitle.toLowerCase(),
        songURL: songURL

    }, { merge: true }).then(function() {
        console.log("Document successfully written!");
        document.getElementById("overlay").style.display = "none";
        $(".wrapper").remove();
        $("#success").removeClass("hidden");
        setTimeout(function() {
            window.location.assign('https://artifex-a904f.web.app/home.html');
        }, 10000);
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function uploadSong(artistName, albumTitle, coverURL, genre, explicit, songTitle, songURL, bpm, releaseDate, key) {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(uid + "/" + artistName + "/songs/" + $("#songURL").prop('files')[0].name).put($("#songURL").prop('files')[0]);
    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        // Handle unsuccessful uploads
        console.log('unsuccesful');
        $("#globalErrText").text("The song upload went wrong, check file format or please contact support");
        $("#globalErr").removeClass("hidden");
        $(".wrapper").show();
        document.getElementById("overlay").style.display = "none";
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            completeSongUpload(artistName, albumTitle, coverURL, genre, explicit, songTitle, downloadURL, bpm, releaseDate, key);
        });
    });
}

function uploadCover(artistName, albumTitle, coverURL, genre, explicit, songTitle, songURL, bpm, releaseDate, key) {
    var storageRef = firebase.storage().ref();
    var uploadTask = storageRef.child(uid + "/" + artistName + "/covers/" + $("#coverURL").prop('files')[0].name).put($("#coverURL").prop('files')[0]);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on('state_changed', function(snapshot) {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
                console.log('Upload is paused');
                break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
                console.log('Upload is running');
                break;
        }
    }, function(error) {
        // Handle unsuccessful uploads
        console.log('unsuccesful');
        $("#globalErrText").text("The cover upload went wrong, check file format or please contact support");
        $("#globalErr").removeClass("hidden");
        $(".wrapper").show();
        document.getElementById("overlay").style.display = "none";
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            uploadSong(artistName, albumTitle, downloadURL, genre, explicit, songTitle, songURL, bpm, releaseDate, key);
        });
    });
}

function setListener() {
    $('input[type=file]').change(function(e) {
        console.log(e);
        $(this).next("label.custom-file-label.label").text(e.target.files[0].name);
    });
}

function completeUpload() {
    let artistName = validateArtistName();
    let albumTitle = validateAlbumTitle();
    let coverURL = validateCoverURL();
    let genre = validateGenre();
    let explicit = validateExplicitRating();
    let songTitle = validateSongTitle();
    let songURL = validateSongURL();
    let bpm = validateBPM();
    let releaseDate = validateReleaseDate();
    let key = validateSongKey();

    console.log("Name: " + artistName);
    console.log("Album Title " + albumTitle);
    console.log("Cover Image: " + coverURL);
    console.log("Genre: " + genre);
    console.log("Explicit: " + explicit)
    console.log("Song Title: " + songTitle);
    console.log("Song: " + songURL);
    console.log("BPM: " + bpm);
    console.log("Release Date: " + releaseDate);


    if (artistName && albumTitle && genre && explicit && songTitle && bpm && releaseDate && key && coverURL && songURL) {
        document.getElementById("overlay").style.display = "block";
        $(".wrapper").hide();
        uploadCover(artistName, albumTitle, null, genre, explicit, songTitle, null, bpm, releaseDate, key);
    }
}

//Checking AuthState of the user.
initUpload = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            user.getIdTokenResult().then((idTokenResult) => {
                //confirm the user is registered 
                if (idTokenResult.claims.moderator || idTokenResult.claims.creator) {
                    console.log('found');
                    $("#navbars").append("<li class='nav-item dropdown' id='creator'>" +
                        "<a class='nav-link dropdown-toggle navbarHeader' href='#' id='navbarDropdown' role='button' data-toggle='dropdown' aria-haspopup='true' aria-expanded='false'>" +
                        "Create" +
                        "</a>" +
                        "<div class='dropdown-menu' aria-labelledby='navbarDropdown'>" +
                        "<a class='dropdown-item' href='/upload.html'>Upload Song</a>" +
                        "<a class='dropdown-item' href='/eventupload.html'>Create Event</a>" +
                        "</div></li>");
                    setListener();
                } else if (idTokenResult.claims.user) {
                    console.log('Insufficient Permission');
                    $(".wrapper").remove();
                    $("#al").removeClass("hidden");
                } else {
                    //if user has not got a profile, let them complete this
                    $(function() {
                        window.location.assign('/registerform.html');
                    });
                }
                uid = user.uid;
            });
        } else {
            // User is signed out.
            logout();
        }
    }, function(error) {
        console.log(error);
    });
}


window.addEventListener('load', function() {
    initUpload();
});