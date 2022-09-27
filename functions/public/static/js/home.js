initApp = function() {
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
                } else if (idTokenResult.claims.user) {
                    console.log('found');
                } else {
                    //if user has not got a profile, let them complete this
                    $(function() {
                        window.location.assign('/registerform.html');
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        } else {
            logout();
        }
    }, function(error) {
        console.log(error);
    });
};


window.addEventListener('load', function() {
    initApp()
});