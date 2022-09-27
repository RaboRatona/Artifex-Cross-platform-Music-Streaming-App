import 'package:artifex/models/genre.dart';

class DBGenres {
  List<Genre> get genresList {
    List<Genre> genrelist = List();
    //genrelist.add(Genre(genre: 'My Library', assetURL: 'assets/your_library.png'));
    //genrelist.add(Genre(genre: 'Recently Added', assetURL: 'assets/recently_added.png'));
    genrelist.add(Genre(genre: 'africa', assetURL: 'assets/africa.png'));
    genrelist.add(Genre(genre: 'blues', assetURL: 'assets/blues.png'));
    genrelist.add(Genre(genre: 'christian', assetURL: 'assets/christian.png'));
    genrelist.add(Genre(genre: 'classical', assetURL: 'assets/classical.png'));
    genrelist.add(Genre(genre: 'country', assetURL: 'assets/country.png'));
    genrelist.add(Genre(genre: 'folk', assetURL: 'assets/folk.png'));
    genrelist.add(Genre(genre: 'hip hop', assetURL: 'assets/hiphop.png'));
    genrelist.add(Genre(genre: 'jazz', assetURL: 'assets/jazz.png'));
    genrelist.add(Genre(genre: 'jingles', assetURL: 'assets/jingles.png'));
    genrelist.add(Genre(genre: 'metal', assetURL: 'assets/metal.png'));
    genrelist.add(Genre(genre: 'musical', assetURL: 'assets/musical.png'));
    genrelist.add(Genre(genre: 'pop', assetURL: 'assets/pop.png'));
    genrelist.add(Genre(genre: 'rock', assetURL: 'assets/rock.png'));
    genrelist.add(Genre(genre: 'rythm', assetURL: 'assets/rythm.png'));
    genrelist.add(Genre(genre: 'soul', assetURL: 'assets/soul.png'));
    genrelist.add(Genre(genre: 'spiritual', assetURL: 'assets/spiritual.png'));
    genrelist.add(Genre(genre: 'techno', assetURL: 'assets/techno.png'));

    return genrelist;
  }

  List<String> get genresString{
    List<String> toReturn = List();
    genresList.map((e) => toReturn.add(e.genre));
    return toReturn;
  }
}