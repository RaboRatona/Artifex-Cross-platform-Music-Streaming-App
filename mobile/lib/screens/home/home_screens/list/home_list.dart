import 'package:artifex/screens/home/home_screens/list/home_list_tile.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

import '../../musicplayer.dart';

class HomeList extends StatelessWidget {
  final songs;

  HomeList({this.songs});

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: songs.length,
        itemBuilder: (context, index) {
          return Container(
            child: HomeTile(
                song: songs[index],
                function: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => MusicPlayer(
                        queue: songs,
                        index: index,
                      ),
                    ),
                  );
                }),
          );
        });
  }
}
