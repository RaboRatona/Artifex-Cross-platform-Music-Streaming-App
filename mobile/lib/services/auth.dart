import 'package:artifex/models/user.dart';
import 'package:firebase_auth/firebase_auth.dart' as Firebase;
import 'package:firebase_core/firebase_core.dart' as Firebase;

import 'database.dart';

class AuthService {

  final Firebase.FirebaseAuth _auth = Firebase.FirebaseAuth.instance;

  //Create USer object based on Firebase user
  User _userFromFirebaseUser(Firebase.User user) {
    return user != null ? User.overloadedConstructor(user.uid) : null;
  }

  //auth change user stream
  Stream<User> get user {
    return _auth.authStateChanges()
    //.map((FirebaseUser user) => _userFromFirebaseUser(user));
        .map(_userFromFirebaseUser);
  }


  //Sign in with email and password
  Future<User> signInWithEmailAndPassword(String email, String password) async {
    try{
      Firebase.UserCredential result = await _auth.signInWithEmailAndPassword(email: email, password: password);
      Firebase.User user = result.user;
      return _userFromFirebaseUser(user);
    }
    catch(e){
      print(e.toString());
      return null;
    }
  }

  //Register with email and password
  Future registerWithEmailAndPassword(String firstName, String lastName, String email,
      String bankAccount, String phoneNumber, DateTime birthday, String password) async {
    try{
      Firebase.UserCredential result = await _auth.createUserWithEmailAndPassword(email: email, password: password);
      Firebase.User user = result.user;
      //Create a new document for the user with uid
      await DatabaseService(uid: user.uid).setData(firstName, lastName, email,
          bankAccount, phoneNumber, birthday);

      return _userFromFirebaseUser(user);
    }
    catch(e){
      print(e.toString());
      return null;
    }
  }

  //Sign Out
  Future signOut() async {
    try{
      return await _auth.signOut();
    }
    catch(e){

      print(e.toString());
      return null;
    }
  }
}