import 'package:artifex/screens/home/playlist/playlist.dart';
import 'package:artifex/services/database_music_service.dart';
import 'package:flutter/material.dart';

class SearchBar extends SearchDelegate {
  String selectedResult = 'songTitle';

  //The first method is buildActions() that return a list of widgets. These widgets are on the right side of the text field.
  @override
  List<Widget> buildActions(BuildContext context) {
    return <Widget>[
      IconButton(icon: Icon(Icons.clear), onPressed: () => query = '')
    ];
  }

  //Now, let's implement the buildLeading(). It's a single widget on the left of the search field.
  @override
  Widget buildLeading(BuildContext context) {
    return IconButton(
        icon: Icon(
          Icons.arrow_back_ios,
          color: Colors.black,
        ),
        onPressed: () => Navigator.pop(context));
  }

  // It returns a widget that it'll cover the body of scaffold when the function showResult() was called
  @override
  Widget buildResults(BuildContext context) {
    //We do not want the enter result button to give a result for now
    return Playlist(
      screenTitle: selectedResult,
      function:
      DatabaseMusicService().getSongs(selectedResult, query.toLowerCase()),
      appBarShowing: false,
    );
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    return Center(
      child: Column(
        //crossAxisAlignment: CrossAxisAlignment.center,
        //mainAxisAlignment: MainAxisAlignment.center,
        children: <Widget>[
          Flexible(
              child: FlatButton(
                onPressed: () =>
                {selectedResult = 'albumTitle', showResults(context)},
                child: Text(query + ' In Albums'),
              )),
          Flexible(
              child: FlatButton(
                onPressed: () =>
                {selectedResult = 'artistName', showResults(context)},
                child: Text(query + ' In Artists'),
              )),
          Flexible(
              child: FlatButton(
                onPressed: () =>
                {selectedResult = 'songTitle', showResults(context)},
                child: Text(query + ' In Songs'),
              )),
        ],
      ),
    );
  }
}