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

function registerUser(){
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var phoneNumber = document.getElementById("phoneNumber").value;
    var birthday = document.getElementById("birthday").value;
    var accountNumber = document.getElementById("accountNumber").value;

    //TODO: FORM VALIDATION
    //creator.catch(e => alert(e.message));

    //"Incorrect Username or Password"
    if(validateFormInitialize() != false){
        const creator = new Promise(() => {
            auth.createUserWithEmailAndPassword(email, password);
        }); 
        creator.then(() => {
            console.log(auth);
        });
        //catch never fires
        creator.catch(e => alert(e.message));

        createUserInFirestore(email, password, firstName, lastName, phoneNumber, birthday, accountNumber);

        console.log('User authentication object was created')
    }

}

async function createUserInFirestore(email, password, firstName, lastName, phoneNumber, birthday, accountNumber) { 
    db.collection('user').doc(auth.currentUser.uid).set(
        {
            'email': email, 
            'firstName': firstName,
            'lastName': lastName,
            'phoneNumber': phoneNumber,
            'birthday': birthday,
            'accountNumber': accountNumber
        }
    )

    //TODO: CATCH ERRORS doesnt work
    //db.catch(e => alert(e.message)) 
    auth.signInWithEmailAndPassword(email, password);
} 
//Validation 

function validateFormInitialize(){
    //resetErrors();
    var isValid = false;
    var counter = 0;
    const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //Email validation
    if(reEmail.test(String(email.value).toLowerCase()) != true){
        document.getElementById("email_error").innerHTML = "Invalid Email Address";
        counter++;
    }
    //Add checking feature to see if email is in use
    /*else if(){

    }*/
    else{
        document.getElementById("email_error").innerHTML = "";
    }

    //Password validation
    if(password.value.length <= 5 ){
        document.getElementById("password_error").innerHTML = "Password must be longer than 5 characters";
        counter++;
    }
    else if(hasNumber(password.value) != true || hasSpecial(password.value) != true || hasUpperCase(password.value)){
        document.getElementById("password_error").innerHTML = "Password needs: Number, Capital Letter and a Special Character";
        counter++;
    }
    else{
        document.getElementById("password_error").innerHTML = "";
    }

    //Name Validation
    if(firstName.value.length <= 1){
        document.getElementById("firstname_error").innerHTML = "Invalid Name";
        counter++;
    }
    else if(hasNumber(firstName.value) == true){
        document.getElementById("firstname_error").innerHTML = "Name Cannot Contain Numbers";
        counter++;
    }
    else if(hasSpecial(firstName.value) == true){
        document.getElementById("firstname_error").innerHTML = "Name Cannot Contain Special Characters";
        counter++;
    }    
    else{
        document.getElementById("firstname_error").innerHTML = "";
    }

    //Surname Validation
    if(lastName.value.length <= 1){
        document.getElementById("lastname_error").innerHTML = "Invalid Surname";
        counter++;
    }
    else if(hasNumber(lastName.value) == true){
        document.getElementById("lastname_error").innerHTML = "Surname Cannot Contain Numbers";
        counter++;
    }
    else if(hasSpecial(lastName.value) == true){
        document.getElementById("lastname_error").innerHTML = "Surname Cannot Contain Special Characters";
        counter++;
    }    
    else{
        document.getElementById("lastname_error").innerHTML = "";
    }

    //Phone number validation
    if(phoneNumber.value.length != 10 ){
        document.getElementById("phonenumber_error").innerHTML = "Invalid Phone Number";
        counter++;
    }
    else if(hasSpecial(phoneNumber.value) == true || hasLetters(phoneNumber.value) == true){
        document.getElementById("phonenumber_error").innerHTML = "Number should only be numeric";
        counter++;
    }
    else{
        document.getElementById("phonenumber_error").innerHTML = "";
    }

    //Date of Birth Validation
    if(birthday.value.length <= 1){
        document.getElementById("birthdate_error").innerHTML = "Please select your date of birth";
        counter++;
    }
    else{
        document.getElementById("birthdate_error").innerHTML = "";
    }
    
    //Account number validation
    if(accountNumber.value.length < 10 || accountNumber.value.length > 20 || hasLetters(accountNumber.value) == true || hasSpecial(accountNumber.value) == true){
        document.getElementById("accountnumber_error").innerHTML = "Invalid Account Details";
        counter++;
    }
    else{
        document.getElementById("accountnumber_error").innerHTML = "";
    }

    //Validity check
    if(counter > 0){
        isValid = false;
    }
    else{
        isValid = true;
    }
    return isValid;
}



function hasNumber(myString){
    return /\d/.test(myString);
}

function hasSpecial(myString){
    return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(myString);
}

function hasUpperCase(myString){
    return /^[A-Z]*$/.test(myString);
}

function hasLetters(myString){
    return /^[A-Za-z]+$/.test(myString);
}