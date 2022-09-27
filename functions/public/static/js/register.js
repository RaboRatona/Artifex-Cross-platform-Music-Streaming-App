function validateNotNullOrEmpty(string) {
    if (isMyStringNull(string) == false && isMyStringEmpty(string) == false) {
        return true;
    } else {
        return false;
    }
}

function validateName(name) {
    if (validateNotNullOrEmpty(name) &&
        doesMyStringContainSpecial(name) == false &&
        doesMyStringContainNumber(name) == false) {
        return true;
    } else {
        return false;
    }
}

function errorShow() {
    console.log('unsuccesful');
    $("#globalErrText").text("Something went wrong, please contact support");
    $("#globalErr").removeClass("hidden");
    $(".wrapper").show();
    document.getElementById("overlay").style.display = "none";
}

function validateBandMemberName(name) {
    if (validateName(name)) {
        return true;
    } else {
        return false;
    }
}

function validateEmail() {
    let strEm = $("#emailConfirmation").val();
    if (validateNotNullOrEmpty(strEm) && isValidEmail(strEm) == true) {
        $("#emailConfirmation").removeClass("is-invalid");
        return strEm;
    } else {
        $("#errorEmailConfirmation").text("Please enter a valid email");
        $("#emailConfirmation").addClass("is-invalid");
        return false;
    }
}

function validatePassword() {
    //var strPs = $("#passwordConfirmation").val();
    var strPs = document.getElementById("passwordConfirmation").value;
    if (validateNotNullOrEmpty(strPs)) {
        $("#passwordConfirmation").removeClass("is-invalid");
        return strPs;
    } else {
        $("#errorPasswordConfirmation").text("Please enter a valid password");
        $("#passwordConfirmation").addClass("is-invalid");
        return false;
    }
}

function validateBirthDay() {
    let strBd = $("#birthDate").val();
    if (validateNotNullOrEmpty(strBd) && strBd !== "yyyy/mm/dd") {
        $("#birthDate").removeClass("is-invalid");
        return strBd;
    } else {
        $("#errorBirthDate").text("Please select your birth date");
        $("#birthDate").addClass("is-invalid");
        return false;
    }
}

//Important note, i changed the input type from number to text.
//I am aware there is some css that can be used to remove the spinner
function validateAccountNr() {
    let strAc = $("#accountNumber").val();
    if (validateNotNullOrEmpty(strAc) && doesMyStringContainOnlyNumbers(strAc) == true &&
        strAc.length > 9 && strAc.length < 21) {
        $("#accountNumber").removeClass("is-invalid");
        return strAc;
    } else {
        $("#errorAccountNumber").text("Please enter a valid account number");
        $("#accountNumber").addClass("is-invalid");
        return false;
    }
}

function validateBranchCode() {
    let strBc = $("#branchCode").val();
    if (validateNotNullOrEmpty(strBc) && doesMyStringContainOnlyNumbers(strBc) == true &&
        strBc.length > 2 && strBc.length < 10) {
        $("#branchCode").removeClass("is-invalid");
        return strBc;
    } else {
        $("#errorBranchCode").text("Please enter a valid branch code");
        $("#branchCode").addClass("is-invalid");
        return false;
    }
}

function validateAccountType() {
    let strAt = $("#accountType").val();
    if (validateNotNullOrEmpty(strAt)) {
        $("#accountType").removeClass("is-invalid");
        return strAt;
    } else {
        $("#errorAccountType").text("Please select an Account Type");
        $("#accountType").addClass("is-invalid");
        return false;
    }
}

function validateBankName() {
    let strBn = $("#bankName").val();
    if (validateNotNullOrEmpty(strBn)) {
        $("#bankName").removeClass("is-invalid");
        return strBn;
    } else {
        $("#errorBankName").text("Please select your Bank Name");
        $("#bankName").addClass("is-invalid");
        return false;
    }
}

function validatePhoneNumber() {
    let strPn = $("#phoneNumber").val();
    if (validateNotNullOrEmpty(strPn) && doesMyStringContainOnlyNumbers(strPn) == true &&
        strPn.length == 10) {
        $("#phoneNumber").removeClass("is-invalid");
        return strPn;
    } else {
        $("#errorPhoneNumber").text("Please enter a valid phone number");
        $("#phoneNumber").addClass("is-invalid");
        return false;
    }
}

function validateFirstName() {
    let strFn = $("#firstName").val();
    if (validateName(strFn)) {
        $("#firstName").removeClass("is-invalid");
        return strFn;
    } else {
        $("#errorFirstName").text("Please enter a valid First Name");
        $("#firstName").addClass("is-invalid");
        return false;
    }
}

function validateLastName() {
    let strLn = $("#lastName").val();
    if (validateName(strLn)) {
        $("#lastName").removeClass("is-invalid");
        return strLn;
    } else {
        $("#errorLastName").text("Please enter a valid Last Name");
        $("#lastName").addClass("is-invalid");
        return false;
    }
}

//=========================================================================================================================
/**
 * Additional validation
 */

function validateBandName() {
    let strBn = $("#bandName").val();
    if (validateNotNullOrEmpty(strBn)) {
        $("#bandName").removeClass("is-invalid");
        return strBn;
    } else {
        $("#errorBandName").text("Please enter a valid Band Name");
        $("#bandName").addClass("is-invalid");
        return false;
    }
}

function validateRespFirstName() {
    let strRFN = $("#respFirstName").val();
    if (validateName(strRFN)) {
        $("#respFirstName").removeClass("is-invalid");
        return strRFN;
    } else {
        $("#errorRespFirstName").text("Please enter a valid First Name");
        $("#respFirstName").addClass("is-invalid");
        return false;
    }
}

function validateRespLastName() {
    let strRLN = $("#respLastName").val();
    if (validateName(strRLN)) {
        $("#respLastName").removeClass("is-invalid");
        return strRLN;
    } else {
        $("#errorRespLastName").text("Please enter a valid Last Name");
        $("#respLastName").addClass("is-invalid");
        return false;
    }
}

function validateContactNumber(element, error) {
    let strCN1 = $(element).val();
    if (validateNotNullOrEmpty(strCN1) && doesMyStringContainOnlyNumbers(strCN1) == true &&
        strCN1.length == 10) {
        $(element).removeClass("is-invalid");
        return strCN1;
    } else {
        $(error).text("Please enter a valid phone number");
        $(element).addClass("is-invalid");
        return false;
    }
}

//Might have to remove has special due to blank spaces.
function validateStreetAddress() {
    let strSA = $("#streetAddress").val();
    if (validateNotNullOrEmpty(strSA) && doesMyStringContainSpecial(strSA) == false) {
        $("#streetAddress").removeClass("is-invalid");
        return strSA;
    } else {
        $("#errorStreetAddress").text("Please enter a valid Street Address");
        $("#streetAddress").addClass("is-invalid");
        return false;
    }
}

function validateSuburb() {
    let strSB = $("#suburb").val();
    if (validateNotNullOrEmpty(strSB) && doesMyStringContainOnlyLetters(strSB)) {
        $("#suburb").removeClass("is-invalid");
        return strSB;
    } else {
        $("#errorSuburb").text("Please enter a valid suburb");
        $("#suburb").addClass("is-invalid");
        return false;
    }
}

function validateProvince() {
    let strPE = $("#province").val();
    if (validateNotNullOrEmpty(strPE)) {
        $("#province").removeClass("is-invalid");
        return strPE;
    } else {
        $("#errorSuburb").text("Please enter a valid suburb");
        $("#province").addClass("is-invalid");
        return false;
    }
}

function validatePostalCode() {
    let strPC = $("#postalCode").val();
    if (validateNotNullOrEmpty(strPC) &&
        doesMyStringContainOnlyNumbers(strPC) == true && strPC.length >= 4 && strPC.length <= 6) {
        $("#postalCode").removeClass("is-invalid");
        return strPC;
    } else {
        $("#errorPostalCode").text("Please enter a valid Postal Code");
        $("#postalCode").addClass("is-invalid");
        return false;
    }
}


//==================================================================================
let index = 2;
$("#addbutton").click(function() {
    $("#dynamic_section").append(
        "<div class='form-group row artist'>" +
        "<label class='control-label col-sm-2 labels' for='bandMemberName" + index + "'" + ">Band Member Name</label>" +
        "<div class='col-sm-10'>" +
        "<div class='row'>" +
        "<div class='col col-sm-6 no_spacing'>" +
        "<input id='bandMemberName" + index + "'" + "class='form-control bandMemberName' type='text' placeholder='Band Member Name' required>" +
        "</div>" +
        "<div class='col col-sm-5 custom-file left_spacing'>" +
        "<input type='file' class='custom-file-input bandMemberPhoto' id='bandMemberPhoto" + index + "'" + " required>" +
        "<label id='bandMemberPhotoLabel" + index + "'" + " class='custom-file-label label' for='bandMemberPhoto" + index + "'" + ">Band Member Picture</label>" +
        "</div>" +

        "</div>" +
        "<div id='errorBandMemberName" + index + "'" + "class='invalid-feedback'></div>" +
        "</div>" +
        "</div>"
    );
    index++;
    setListener();
});

function validateMembersAndPhotos() {
    let index = 1;
    let result = true;
    $(".form-control.bandMemberName").each(function() {
        let memberName = $(this).val();
        if (validateBandMemberName(memberName)) {
            $(this).removeClass("is-invalid");
            $("#errorBandMemberName" + index).text("");
            result = result && true;
        } else {
            $("#errorBandMemberName" + index).text("Invalid band member name");
            $(this).addClass("is-invalid");
            result = result && false;
        }

        index++;
    });

    let secondIndex = 1;
    let secondResult = true;
    $(".custom-file-input.bandMemberPhoto").each(function() {
        if ($(this).val()) {
            $(this).removeClass("is-invalid");
            secondResult = secondResult && true;
            $("#errorBandMemberName" + secondIndex).text("");
        } else {
            $("#bandMemberPhotoLabel" + secondIndex).css("text-color", "red");
            $("#errorBandMemberName" + secondIndex).text("Invalid band member photo");
            $(this).addClass("is-invalid");
            result = secondResult && false;
        }

        secondIndex++;
    });

    return result && secondResult;
}

function validateLogo() {
    if ($("#bandLogoURL").val()) {
        $("#bandLogoURL").removeClass("is-invalid");
        return true;
    } else {
        $("#bandLogoURL").css("text-color", "red");
        $("#errorBandLogoURL").text("Invalid band logo");
        $("#bandLogoURL").addClass("is-invalid");
        return false;
    }
}
//==================================================================================
function signInAgain() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
    }, function(error) {
        console.error('Sign Out Error', error);
        window.location.assign('https://artifex-a904f.web.app/');
    });
}

function updateProfile(email, birthday, accountNr, accountType, bankName, firstName, lastName, branchCode, phoneNumber) {
    var db = firebase.firestore();
    var userRef = db.collection('user').doc(uid);

    var x = userRef.set({
        email: email,
        birthday: birthday,
        bankAccount: accountNr,
        accountType: accountType,
        bankName: bankName,
        firstName: firstName,
        lastName: lastName,
        branchCode: branchCode,
        phoneNumber: phoneNumber,
        uid: uid
    }, { merge: true }).then(function() {
        console.log("Document successfully written!");
        signInAgain();
    }).catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function completeUserProfile() {
    let email = validateEmail();
    let password = validatePassword();
    let birthday = validateBirthDay();
    let accountNr = validateAccountNr();
    let accountType = validateAccountType();
    let bankName = validateBankName();
    let firstName = validateFirstName();
    let lastName = validateLastName();
    let branchCode = validateBranchCode();
    let phoneNumber = validatePhoneNumber();

    if (email && password && birthday && accountNr && accountType && bankName && firstName && lastName && branchCode && phoneNumber) {
        updateProfile(email, birthday, accountNr, accountType, bankName, firstName, lastName, branchCode, phoneNumber);
    }
}

function createBand(bandName, memberMap, downloadURL) {
    var db = firebase.firestore();
    var bandRef = db.collection('band').doc(bandName);

    bandRef.set({
        bandName: bandName,
        createdBy: uid,
        bandLogoURL: downloadURL,
        bandMembers: memberMap
    }, { merge: true }).then(function() {
        console.log("Document successfully written!");
        document.getElementById("overlay").style.display = "none";
        $(".wrapper").remove();
        $("#success").removeClass("hidden");
        setTimeout(function() {
            signInAgain();
        }, 10000);
    }).catch(function(error) {
        console.error("Error writing document: ", error);
        errorShow();
    });

}

function uploadBandLogo(bandName, memberMap) {
    //upload band logo
    var storageRef = firebase.storage().ref();
    var logo = $("#bandLogoURL").prop('files')[0];
    var uploadTask = storageRef.child(uid + "/" + bandName + "/bandInfo/" + logo.name).put(logo);

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
        console.log(error);
        errorShow();
    }, function() {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            createBand(bandName, memberMap, downloadURL);
        });
    });
}

var memberMap = {};
var memberMap3 = new Map();

function uploadFile(bandName) {
    let index = 1;
    let nameIndex = 1;


    var storageRef = firebase.storage().ref();
    let arraySize = $(".custom-file-input.bandMemberPhoto").length;
    $(".custom-file-input.bandMemberPhoto").each(function() {
        var files = $(this).prop('files')[0];
        var uploadTask = storageRef.child(uid + "/" + bandName + "/bandInfo/" + files.name).put(files);

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
            console.log(error);
            errorShow();
        }, function() {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                memberMap[downloadURL] = $("#bandMemberName" + nameIndex).val();
                memberMap3.set(downloadURL, $("#bandMemberName" + nameIndex).val());


                if (index === arraySize + 1) {
                    uploadBandLogo(bandName, memberMap);
                }

                nameIndex++;
            });
        });

        index++;


    });
}

function updateCreatorProfile(email, birthday, accountNr, accountType, bankName, firstName, lastName, branchCode, phoneNumber,
    bandName, streetAddress, suburb, province, postalCode, contactNumber1, contactNumber2) {
    console.log('creator update');
    var db = firebase.firestore();
    var userRef = db.collection('user').doc(uid);

    userRef.set({
        email: email,
        birthday: birthday,
        bankAccount: accountNr,
        accountType: accountType,
        bankName: bankName,
        firstName: firstName,
        lastName: lastName,
        branchCode: branchCode,
        phoneNumber: phoneNumber,
        uid: uid,
        responsibleFor: bandName,
        streetAddress: streetAddress,
        suburb: suburb,
        province: province,
        postalCode: postalCode,
        contactNumber1: contactNumber1,
        contactNumber2: contactNumber2
    }, { merge: true }).then(function() {
        console.log("Document successfully written!");
        uploadFile(bandName);
    }).catch(function(error) {
        console.error("Error writing document: ", error);
        errorShow();
    });
}

function completeCreatorProfile() {
    let email = validateEmail();
    let password = validatePassword();
    let birthday = validateBirthDay();
    let accountNr = validateAccountNr();
    let accountType = validateAccountType();
    let bankName = validateBankName();
    let firstName = validateFirstName();
    let lastName = validateLastName();
    let branchCode = validateBranchCode();
    let phoneNumber = validatePhoneNumber();

    let bandName = validateBandName();
    //validate members & pictures
    let bandMember = validateMembersAndPhotos()
        //validate logo
    let bandLogo = validateLogo()
        //street
    let streetAddress = validateStreetAddress();
    //suburb
    let suburb = validateSuburb();
    //province
    let province = validateProvince();
    //postal code
    let postalCode = validatePostalCode();
    //contact number 1
    let contactNumber1 = validateContactNumber("#contactNumber1", "#errorContactNumber1");
    //contact number 2 
    let contactNumber2 = validateContactNumber("#contactNumber2", "#errorContactNumber2");

    if (bandMember && bandLogo && email && password && birthday && accountNr && accountType && bankName && firstName && lastName && branchCode && phoneNumber && bandName &&
        streetAddress && suburb && province && postalCode && contactNumber1 && contactNumber2) {
        console.log('inside');
        document.getElementById("overlay").style.display = "block";
        $(".wrapper").hide();
        updateCreatorProfile(email, birthday, accountNr, accountType, bankName, firstName, lastName, branchCode, phoneNumber, bandName, streetAddress, suburb, province, postalCode, contactNumber1, contactNumber2);
    }
}

function completeProfile() {
    if (document.getElementById('gridRadios1').checked) {
        completeCreatorProfile();
    } else if (document.getElementById("gridRadios2").checked) {
        completeUserProfile();
    }
}