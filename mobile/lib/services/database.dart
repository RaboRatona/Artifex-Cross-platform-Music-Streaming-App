import 'package:artifex/models/user.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:firebase_auth/firebase_auth.dart' as Firebase;
import 'package:firebase_core/firebase_core.dart' as Firebase;

class DatabaseService {
  //Database Collection
  final CollectionReference userCollection =
      FirebaseFirestore.instance.collection('user');
  final String uid;

  DatabaseService({this.uid});

  Future updateUserData(String firstName, String lastName, String email,
      String bankAccount, String phoneNumber, DateTime birthday) async {
    return await userCollection.doc(uid).set({
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'bankAccount': bankAccount,
      'phoneNumber': phoneNumber,
      //'birthday': DateFormat('yyyy-MM-dd').format(birthday),
      'birthday': birthday,
    });
  }

  //UserData from Snapshot
  User _userDataFromSnapshot(DocumentSnapshot snapshot) {
    return User(
        uid,
        snapshot.data()['firstName'],
        snapshot.data()['lastName'],
        snapshot.data()['email'],
        snapshot.data()['bankAccount'],
        snapshot.data()['phoneNumber'],
        snapshot.data()['birthday'],
        //DateTime.parse(snapshot.data()['birthday'])
    );
  }

  Future<void> setData(String firstName, String lastName, String email, String bankAccount,
      String phoneNumber, DateTime birthday) {
    userCollection.doc(uid).set({
      'uid':uid,
      'firstName': firstName,
      'lastName': lastName,
      'email': email,
      'bankAccount': bankAccount,
      'phoneNumber': phoneNumber,
      //'birthday': DateFormat('yyyy-MM-dd').format(birthday),
      'birthday': birthday,
    }).then((_) {
      print("success!");
      Firebase.FirebaseAuth.instance.signOut();
    }).catchError((error) => {
      print('her'),
      print(error)
    });
  }

  //Get user doc stream
  Stream<User> get userData {
    return userCollection.doc(uid).snapshots().map(_userDataFromSnapshot);
  }

//Stream builder is for data used in a single widget
}
