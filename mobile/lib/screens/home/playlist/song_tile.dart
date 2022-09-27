import 'package:artifex/models/song.dart';
import 'package:flutter/material.dart';
import 'package:artifex/shared/capitalizer.dart';

class SongTile extends StatelessWidget {
  final Song song;
  final Function function;
  SongTile({this.song, this.function});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: EdgeInsets.only(top: 8),
      child: Card(
        margin: EdgeInsets.fromLTRB(20, 6, 20, 0),
        child: ListTile(
          leading: CircleAvatar(
            backgroundImage: NetworkImage(song.coverURL),
            radius: 25,
            backgroundColor: Colors.grey,
          ),
          title: Text(song.songTitle.capitalizeFirstofEach),
          subtitle: Text(song.artistName.capitalizeFirstofEach),
          onTap: function,
        ),
      ),
    );
  }
}