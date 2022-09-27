function logout() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');

    }, function(error) {
        console.error('Sign Out Error', error);
        window.location.assign('https://artifex-a904f.web.app/');
    });
    window.location.assign('https://artifex-a904f.web.app/');
}