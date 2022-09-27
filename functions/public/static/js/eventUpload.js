var uid;

function validateNotNullOrEmpty(string) {
    if (isMyStringNull(string) == false && isMyStringEmpty(string) == false) {
        return true;
    } else {
        return false;
    }
}

function validateNames(string) {
    if (validateNotNullOrEmpty(string) &&
        doesMyStringContainOnlyNumbers(string) == false &&
        doesMyStringContainOnlySpecials(string) == false) {
        return true;
    } else {
        return false;
    }
}

function validateBandName() {
    let bandName = $("#bandName").val();
    if (validateNames(bandName)) {
        $("#bandName").removeClass("is-invalid");
        return bandName;
    } else {
        $("#errorBandName").text("Please enter a valid Band Name");
        $("#bandName").addClass("is-invalid");
        return false;
    }
}

function validateEventTitle() {
    let eventTitle = $("#eventTitle").val();
    if (validateNames(eventTitle)) {
        $("#eventTitle").removeClass("is-invalid");
        return eventTitle;
    } else {
        $("#errorEventTitle").text("Please enter a valid Event Name");
        $("#eventTitle").addClass("is-invalid");
        return false;
    }
}

function validateDescription() {
    let description = $("#description").val();
    if (validateNames(description) && description.length >= 1 && description.length <= 30) {
        $("#description").removeClass("is-invalid");
        return description;
    } else {
        $("#errorDescription").text("Please enter a valid Event Description");
        $("#description").addClass("is-invalid");
        return false;
    }
}

function validateCoverURL() {
    let coverURL = $("#coverURL").val();
    if (validateNotNullOrEmpty(coverURL)) {
        $("#coverURL").removeClass("is-invalid");
        return coverURL;
    } else {
        $("#coverURL").css("text-color", "red");
        $("#errorCoverURL").text("Invalid Cover Image");
        $("#coverURL").addClass("is-invalid");
        return false;
    }
}

function validateStartDate() {
    let startDate = $("#startDate").val();
    let startDateTime = $("#startDate_time").val();
    if (validateNotNullOrEmpty(startDate) &&
        validateNotNullOrEmpty(startDateTime) && startDateTime && startDate) {
        $("#startDate").removeClass("is-invalid");
        $("#startDate_time").removeClass("is-invalid");
        $("#errorStartDate").css({ "display": "" });
        return new Date(startDate + " " + startDateTime);
    } else {
        $("#errorStartDate").text("Please specify a start date & time");
        $("#startDate").addClass("is-invalid");
        $("#startDate_time").addClass("is-invalid");
        $("#errorStartDate").css({ "display": "block" });
        return false;
    }
}

function validateEndDate() {
    let endDate = $("#endDate").val();
    let endDateTime = $("#endDate_time").val();
    if (validateNotNullOrEmpty(endDate) && validateNotNullOrEmpty(endDateTime) && endDate && endDateTime) {
        $("#endDate").removeClass("is-invalid");
        $("#endDate_time").removeClass("is-invalid");
        $("#errorEndDate").css({ "display": "" });
        return new Date(endDate + " " + endDateTime);
    } else {
        $("#errorEndDate").text("Please specify an end date & time");
        $("#endDate").addClass("is-invalid");
        $("#endDate_time").addClass("is-invalid");
        $("#errorEndDate").css({ "display": "block" });
        return false;
    }
}

function validateLocation() {
    let location = $("#location").val();
    if (validateNames(location)) {
        $("#location").removeClass("is-invalid");
        return location;
    } else {
        $("#errorLocation").text("Please enter a valid Location");
        $("#location").addClass("is-invalid");
        return false;
    }
}

function validateCompuTicket() {
    let compuTicket = $("#compuTicket").val();
    if (validateNotNullOrEmpty(compuTicket)) {
        $("#compuTicket").removeClass("is-invalid");
        return compuTicket;
    } else {
        $("#errorCompuTicket").text("Please enter a valid Location");
        $("#compuTicket").addClass("is-invalid");
        return false;
    }
}

function completeEventUpload(eventTitle, description, coverURL, startDate, endDate, location, compuTicket, bandName) {
    let db = firebase.firestore();
    let eventRef = db.collection('events').doc();

    eventRef.set({
        eventTitle: eventTitle.toLowerCase(),
        description: description.toLowerCase(),
        coverURL: coverURL,
        createdBy: uid,
        startDate: firebase.firestore.Timestamp.fromDate(startDate),
        endDate: firebase.firestore.Timestamp.fromDate(endDate),
        location: location.toLowerCase(),
        compuTicket: compuTicket,
        eventID: eventRef.id,
        bandName: bandName
    }, { merge: true }).then(function() {
        console.log("Document added!");
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

function uploadEventCover(eventTitle, description, coverURL, startDate, endDate, location, compuTicket, bandName) {
    var storageRef = firebase.storage().ref();
    //needed:bandname
    var uploadTask = storageRef.child(uid + "/" + bandName + "/eventCovers/" + eventTitle + $("#coverURL").prop('files')[0].name).put($("#coverURL").prop('files')[0]);

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
        $("#globalErrors").text("Something went wrong uploading the event cover. Please check the format of the file or please contact support");
        $(".wrapper").show();
        $("#globalErr").removeClass("hidden");
        document.getElementById("overlay").style.display = "none";
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            completeEventUpload(eventTitle, description, downloadURL, startDate, endDate, location, compuTicket, bandName);
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
    let bandName = validateBandName();
    let eventTitle = validateEventTitle();
    let description = validateDescription();
    let coverURL = validateCoverURL();
    let startDate = validateStartDate();
    let endDate = validateEndDate();
    let location = validateLocation();
    let compuTicket = validateCompuTicket();

    console.log("Event Title: " + eventTitle);
    console.log("Description " + description);
    console.log("Cover URL: " + coverURL);
    console.log("Start Date: " + startDate);
    console.log("End Date: " + endDate)
    console.log("Location: " + location);
    console.log("Computicket Link: " + compuTicket);

    if (eventTitle && description && coverURL && startDate && endDate && location && compuTicket) {
        document.getElementById("overlay").style.display = "block";
        $(".wrapper").hide();
        uploadEventCover(eventTitle, description, null, startDate, endDate, location, compuTicket, bandName);
    }
}

//Checking AuthState of the user.
initEventUpload = function() {
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
    initEventUpload();
});