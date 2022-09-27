import 'package:artifex/models/genre.dart';
import 'package:artifex/screens/home/playlist/playlist.dart';
import 'package:artifex/shared/genre_list_array.dart';
import 'package:artifex/services/database_music_service.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'discover_tile.dart';

class DiscoverList extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    List<Genre> genrelist = DBGenres().genresList;

    return GridView.builder(
        itemCount: genrelist.length,
        gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount:
            (MediaQuery
                .of(context)
                .orientation == Orientation.portrait)
                ? 2
                : 3),
        itemBuilder: (context, index) {
          return GenreTile(
              genre: genrelist[index],
              function: () => {
                Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) =>
                          Playlist(screenTitle: genrelist[index].genre,
                              appBarShowing: true,
                              function: DatabaseMusicService().getSongs('genre', genrelist[index].genre)),
                    )
                )
              }
          );
        }
    );
  }
}