import 'package:artifex/models/song.dart';
import 'package:artifex/screens/home/playlist/empty_playlist.dart';
import 'package:artifex/screens/home/playlist/song_list.dart';
import 'package:artifex/shared/capitalizer.dart';
import 'package:artifex/shared/loading_screen.dart';
import 'package:artifex/shared/standard_background.dart';
import 'package:flutter/material.dart';

class Playlist extends StatelessWidget {
  final String screenTitle;
  final Future<List<Song>> function;
  final bool appBarShowing;

  Playlist(
      {this.screenTitle, this.function, this.appBarShowing});

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
        future: function,
        builder: ((BuildContext context, AsyncSnapshot<List<Song>> snapshot) {
          List<Widget> children;

          if (snapshot.hasData && snapshot.data.length > 0) {
            children = <Widget>[
              Flexible(child: SongList(songs: snapshot.data))
            ];
            print(snapshot.data.length);
          } else if (snapshot.hasData) {
            children = <Widget>[Flexible(child: EmptyPlaylist())];
          } else if (snapshot.hasError) {
            print('we have error');
            print(snapshot.error.toString());
          } else {
            children = <Widget>[Loading()];
          }
          return Center(
            child: Scaffold(
              backgroundColor: Color.fromRGBO(239, 82, 97, 1),
              appBar: !appBarShowing
                  ? null
                  : AppBar(
                      title: Text(
                        screenTitle.capitalizeFirstofEach,
                        style: TextStyle(color: Colors.black),
                      ),
                      leading: IconButton(
                        icon: Icon(Icons.arrow_back_ios, color: Colors.black),
                        onPressed: () =>{
                            Navigator.of(context).pop()}
                      ),
                      backgroundColor: Colors.transparent,
                      elevation: 0.0,
                      centerTitle: true,
                    ),
              body: DecoratedBox(
                decoration: appBackground(),
                child: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: children),
              ),
            ),
          );
        }));
  }
}
