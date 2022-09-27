import 'package:artifex/models/song.dart';
import 'package:path/path.dart';
import 'package:sqflite/sqflite.dart';

class DatabaseHelper {
  Future<Database> get database async {
    return openDatabase(
      // Set the path to the database. Note: Using the `join` function from the
      // `path` package is best practice to ensure the path is correctly
      // constructed for each platform.
      join(await getDatabasesPath(), 'song_database.db'),
      // When the database is first created, create a table to store dogs.
      onCreate: (db, version) {
        return db.execute(
          "CREATE TABLE songs(songID TEXT PRIMARY KEY, artistName TEXT, songTitle TEXT,albumTitle TEXT,coverURL TEXT,songURL TEXT,explicit TEXT)",
        );
      },
      // Set the version. This executes the onCreate function and provides a
      // path to perform database upgrades and downgrades.
      version: 1,
    );

  }

  // Helper methods
  Future<void> insertSong(Song song) async {
    // Get a reference to the database.
    final Database db = await database;

    // Insert the Dog into the correct table. Also specify the
    // `conflictAlgorithm`. In this case, if the same dog is inserted
    // multiple times, it replaces the previous data.
    await db.insert(
      'songs',
      song.toMap(),
      conflictAlgorithm: ConflictAlgorithm.replace,
    );

    db.close();
  }

  Future<List<Song>> songs() async {
    // Get a reference to the database.
    final Database db = await database;

    // Query the table for all The Dogs.
    final List<Map<String, dynamic>> maps = await db.query('songs');

    // Convert the List<Map<String, dynamic> into a List<Dog>.
    return List.generate(maps.length, (i) {
      return Song(
        songID: maps[i]['songID'],
        songTitle: maps[i]['songTitle'],
        artistName: maps[i]['artistName'],
        coverURL: maps[i]['coverURL'],
        songURL: maps[i]['songURL'],
        explicit: (maps[i]['explicit']).parseBool(),
      );
    });
  }

  Future<void> deleteSongs(String id) async {
    // Get a reference to the database.
    final db = await database;

    // Remove the Dog from the database.
    await db.delete(
      'songs',
      // Use a `where` clause to delete a specific dog.
      where: "songID = ?",
      // Pass the Dog's id as a whereArg to prevent SQL injection.
      whereArgs: [id],
    );
  }

  Future<bool> exists(String id) async {
    // Get a reference to the database.
    final db = await database;

    // Remove the Dog from the database.
    return (await db.rawQuery('SELECT * FROM songs WHERE songID=?', [id])).isEmpty;
  }
}