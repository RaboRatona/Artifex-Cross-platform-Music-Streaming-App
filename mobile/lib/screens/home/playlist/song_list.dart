import 'dart:collection';

import 'package:artifex/models/song.dart';
import 'package:artifex/screens/home/musicplayer.dart';
import 'package:artifex/screens/home/playlist/song_tile.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SongList extends StatelessWidget {
  final songs;
  SongList({this.songs});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
      itemCount: songs.length,
      itemBuilder: (context, index) {
        return SongTile(
            song: songs[index],
            function: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                    builder: (context) => MusicPlayer(queue: songs, index: index)),
              );
            });
      },
    );
  }
}
