var uid;

function setListener() {
    $('input[type=file]').change(function(e) {
        console.log(e);
        $(this).next("label.custom-file-label.label").text(e.target.files[0].name);
    });
}

function addCreatorFormElements() {
    $(function() {
        $(".form-group.row.artist").each(function() {
            $(this).removeClass("hidden");
        });
    });

    $("#firstName").attr("placeholder", "Resposible's first name");
    $("#lastName").attr("placeholder", "Responsible's last name");
}

function hideCreatorFormElements() {
    $(function() {
        $(".form-group.row.artist").each(function() {
            $(this).addClass("hidden");
        });
    });

    $("#firstName").attr("placeholder", "First Name");
    $("#lastName").attr("placeholder", "Last Name");
}

function initRadios() {
    $('input[type=radio][name=gridRadios]').change(function() {
        if (this.value == 'creator') {
            console.log('creator selected');
            addCreatorFormElements();
        } else if (this.value == 'user') {
            console.log('user selected');
            hideCreatorFormElements();
        }
    });
}

initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            const name = displayName.split(" ", 2);
            var email = user.email;
            uid = user.uid;

            $("#emailConfirmation").val(email);
            $("#firstName").val(name[0]);
            $("#lastName").val(name[1]);

            initRadios();
            setListener();

        } else {
            logout();
        }
    }, function(error) {
        console.log(error);
    });
};

window.addEventListener('load', function() {
    initApp()
        //initRadios();
        //setListener();
});