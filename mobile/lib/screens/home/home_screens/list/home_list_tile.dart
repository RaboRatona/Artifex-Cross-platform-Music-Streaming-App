import 'package:artifex/models/song.dart';
import 'package:flutter/material.dart';

class HomeTile extends StatelessWidget {
  final Song song;
  final Function function;

  HomeTile({this.song, this.function});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: function,
      child: Card(
        color: Colors.blue,
        child: Container(
          child: Center(child: Image.network(song.coverURL)),
        ),
      ),
    );
  }
}
