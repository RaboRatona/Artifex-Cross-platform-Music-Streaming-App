import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// The Firebase Admin SDK to access Cloud Firestore. 
admin.initializeApp();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.creationOfUser = functions.firestore.document('user/{userId}').onCreate((snap, context) => {
    const userMail = snap.data().uid;
    console.log(userMail);
    if (userMail === 'victor@gmail.com' || userMail === 'charl@gmail.com') {
        return grantModeratorRole(userMail);
    } else if (snap.data().responsibleFor) {
        return grantCreatorAndUserRole(userMail, true);
    } else {
        return grantCreatorAndUserRole(userMail, false);
    }
});

exports.creationOfSong = functions.firestore.document('songs/{songId}').onCreate((snap, context) => {
    return snap.ref.update({
        plays: 0
    });
});

async function grantModeratorRole(email: string): Promise<void> {
    console.log('start of creator or moderator role');
    const user = await admin.auth().getUser(email);
    if (user.customClaims && (user.customClaims as any).moderator === true) {
        return;
    }

    return admin.auth().setCustomUserClaims(user.uid, {
        moderator: true
    }).catch((error) => { console.log(error); }).then(() => { console.log('set') });
}

async function grantCreatorAndUserRole(email: string, isCreator: boolean): Promise<void> {
    console.log('start of creator or user role');
    const user = await admin.auth().getUser(email);
    console.log(user);
    if (user !== null && user.customClaims
        && ((user.customClaims as any).creator === true
            || (user.customClaims as any).user === true)) {
        return;
    }

    console.log('I passed the first if');

    if (isCreator) {
        console.log('I am a creator');
        return admin.auth().setCustomUserClaims(user.uid, {
            creator: true
        }).catch((error) => { console.log(error); }).then(() => { console.log('set') });
    } else {
        console.log('I am not a creator');
        return admin.auth().setCustomUserClaims(user.uid, {
            user: true
        }).catch((error) => { console.log(error); }).then(() => { console.log('set') });
    }

} 