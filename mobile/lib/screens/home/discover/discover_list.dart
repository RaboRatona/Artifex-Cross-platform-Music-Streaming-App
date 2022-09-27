import 'package:artifex/models/genre.dart';
import 'package:artifex/screens/home/home_state_tracking.dart';
import 'package:artifex/screens/home/playlist/playlist.dart';
import 'package:artifex/shared/genre_list_array.dart';
import 'package:artifex/services/database_music_service.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'discover_tile.dart';

class DiscoverList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Genre> genrelist =  DBGenres().genresList;

    final _state = Provider.of<ScreenState>(context);

    if (_state.currentScreenState == LoadingState.Pre) {
      return GridView.builder(
          itemCount: genrelist.length,
          gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount:
                  (MediaQuery.of(context).orientation == Orientation.portrait)
                      ? 2
                      : 3),
          itemBuilder: (context, index) {
            return GenreTile(
                genre: genrelist[index],
                function: () {
                  print('clicked');
                  final screenState =
                      Provider.of<ScreenState>(context, listen: false);
                  screenState.currentScreenState = LoadingState.Result;
                  screenState.orderBy = 'genre';
                  screenState.orderByValue = genrelist[index].genre;
                });
          });
    } else {
      return Playlist(
          orderBy: _state.orderBy, orderByValue: _state.orderByValue, function: DatabaseMusicService().getSongs(_state.orderBy, _state.orderByValue), appBarShowing: true);
    }
  }
}
