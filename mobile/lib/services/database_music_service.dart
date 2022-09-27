import 'package:artifex/models/event.dart';
import 'package:artifex/models/song.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class DatabaseMusicService {
  final CollectionReference artistCollection =
      FirebaseFirestore.instance.collection('songs');

//BrewList from snapshot
  List<Song> _artistCollectionFromSnapshot(QuerySnapshot snapshot) {
    return snapshot.docs.map((doc) {
      return Song(
        songID: doc.data()['songID'],
        songTitle: doc.data()['songTitle'],
        artistName: doc.data()['artistName'],
        coverURL: doc.data()['coverURL'],
        songURL: doc.data()['songURL'],
        explicit: doc.data()['explicit'].toLowerCase() == 'true',
      );
    }).toList();
  }

  Future<List<Song>> getSongs(String orderBy, String orderByValue) async {
    //TODO: FOR A MORE ADVANCED SEARCH ALGORITHM - EXTERNAL SERVICES NEED TO BE USED AS FIREBASE FIRESTORE DOESNT SUPPORT LIKE YET - SOMETHING LIKE ALGOLIA IS A SOLUTION
    //TODO: FOR NOW ONLY searchString% gets returned instead of %searchString%
    var querySnap = await artistCollection
        .where(orderBy, isGreaterThanOrEqualTo: orderByValue)
        .where(orderBy, isLessThanOrEqualTo: orderByValue + '\uf8ff')
        .get();

    return _artistCollectionFromSnapshot(querySnap);
  }

  setLiked(String songID, String UID) {
    artistCollection.doc(songID).update({
      'liked': FieldValue.arrayUnion([UID]),
    }).then((_) {
      print("success!");

      FirebaseFirestore.instance.collection('user').doc(UID).update({
        'likedSongs': FieldValue.arrayUnion([songID]),
      }).then((_) => "succes!");
    });
  }

  removeLiked(String songID, String UID) {
    artistCollection.doc(songID).update({
      'liked': FieldValue.arrayRemove([UID]),
    }).then((_) {
      print("success!");
      FirebaseFirestore.instance.collection('user').doc(UID).update({
        'likedSongs': FieldValue.arrayRemove([songID]),
      }).then((_) => "succes!");
    });
  }

  Future<List<Song>> getLikedSongs(String UID) async {
    //TODO: FOR A MORE ADVANCED SEARCH ALGORITHM - EXTERNAL SERVICES NEED TO BE USED AS FIREBASE FIRESTORE DOESNT SUPPORT LIKE YET - SOMETHING LIKE ALGOLIA IS A SOLUTION
    //TODO: FOR NOW ONLY searchString% gets returned instead of %searchString%
    var querySnap = await artistCollection
        .where('liked', arrayContains: UID)
        .limit(15)
        .get();

    return _artistCollectionFromSnapshot(querySnap);
  }

  Stream<List<Song>> getLikedSongsStream(String UID) {
    //TODO: FOR A MORE ADVANCED SEARCH ALGORITHM - EXTERNAL SERVICES NEED TO BE USED AS FIREBASE FIRESTORE DOESNT SUPPORT LIKE YET - SOMETHING LIKE ALGOLIA IS A SOLUTION
    //TODO: FOR NOW ONLY searchString% gets returned instead of %searchString%
    return artistCollection
        .where('liked', arrayContains: UID)
        .limit(15)
        .snapshots()
        .map((doc) => _artistCollectionFromSnapshot(doc));
  }

  updatePlays(String songID) {
    artistCollection.doc(songID).update(<String, dynamic>{
      'plays': FieldValue.increment(1),
    });
  }

  Future<List<Song>> getRecentlyAdded() async {
    //TODO: FOR A MORE ADVANCED SEARCH ALGORITHM - EXTERNAL SERVICES NEED TO BE USED AS FIREBASE FIRESTORE DOESNT SUPPORT LIKE YET - SOMETHING LIKE ALGOLIA IS A SOLUTION
    //TODO: FOR NOW ONLY searchString% gets returned instead of %searchString%
    var querySnap = await artistCollection
        .orderBy("releaseDate", descending: true)
        .get()
        .catchError((error) => {print(error)});

    return _artistCollectionFromSnapshot(querySnap);
  }

  Future<List<Song>> getMostPlayed() async {
    //TODO: FOR A MORE ADVANCED SEARCH ALGORITHM - EXTERNAL SERVICES NEED TO BE USED AS FIREBASE FIRESTORE DOESNT SUPPORT LIKE YET - SOMETHING LIKE ALGOLIA IS A SOLUTION
    //TODO: FOR NOW ONLY searchString% gets returned instead of %searchString%
    var querySnap = await artistCollection
        .orderBy("plays", descending: true)
        .get()
        .catchError((error) => {print(error)});

    return _artistCollectionFromSnapshot(querySnap);
  }

  List<Event> _eventFromCollectionSnapshot(QuerySnapshot snapshot) {
    return snapshot.docs.map((doc) {
      return Event(
          coverURL: doc.data()['coverURL'],
          description: doc.data()['description'],
          endDate: doc.data()['endDate'],
          startDate: doc.data()['startDate'],
          eventTitle: doc.data()['eventTitle'],
          location: doc.data()['location'],
          compuTicket: doc.data()['compuTicket']);
    }).toList();
  }

  Future<List<Event>> getEvents() async {
    var querySnap = await FirebaseFirestore.instance
        .collection('events')
        .get()
        .catchError((error) => {print(error)});

    return _eventFromCollectionSnapshot(querySnap);
  }
}
