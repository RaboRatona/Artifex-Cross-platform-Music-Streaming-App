// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

function signUp(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Register Complete");
}

function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));

    alert("Signed In"+ email.value);

    //Take user to next page
}

/*function signOut(){
    auth.signOut();
    alert("Signed Out")
}*/

//<button onclick="signIn()" id="signIn">Sign In</button>
//<button onclick="signOut()" id="signOut">Sign Out</button>

auth.onAuthStateChanged(function(user){
    if(user){
        //sign in
        var email = user.email;
        alert("Active User"+ email);
    }
    else{
        //not signed in
        alert("No Active User");
    }
});