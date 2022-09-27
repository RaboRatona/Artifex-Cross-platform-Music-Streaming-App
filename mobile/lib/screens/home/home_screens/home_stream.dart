import 'dart:async';

import 'package:artifex/models/song.dart';
import 'package:artifex/screens/home/playlist/playlist.dart';
import 'package:artifex/services/database_music_service.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'list/home_list.dart';


class HomeSection_Stream extends StatelessWidget {
  final String sectionTitle;
  final Stream<List<Song>> query;
  final String uid;

  HomeSection_Stream({this.sectionTitle, this.query, this.uid});

  @override
  Widget build(BuildContext context) {
    return Column(
      mainAxisSize: MainAxisSize.min,
      children: <Widget>[
        Row(
          children: [
            Text(sectionTitle,
                style: GoogleFonts.roboto(
                    fontWeight: FontWeight.bold,
                    color: Colors.white,
                    fontSize: MediaQuery
                        .of(context)
                        .size
                        .height * .04)),
            FlatButton(
                onPressed: () =>
                {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (context) =>
                            Playlist(screenTitle: sectionTitle,
                                appBarShowing: true,
                                function: DatabaseMusicService().getLikedSongs(uid)),
                      )
                  )
                },
                child: Icon(
                  Icons.chevron_right,
                  color: Colors.white,
                ))
          ],
        ),
        Container(
            height: MediaQuery
                .of(context)
                .size
                .height * .24,
            width: MediaQuery
                .of(context)
                .size
                .width,
            child: StreamBuilder<List<Song>>(
              stream: DatabaseMusicService().getLikedSongsStream(uid),
              builder: (BuildContext context,
                  AsyncSnapshot<List<Song>> snapshot) {
                if (snapshot.hasError) {
                  return Text('Something went wrong');
                }

                if (snapshot.connectionState == ConnectionState.waiting) {
                  return CircularProgressIndicator();
                }

                if(snapshot.hasData  && snapshot.data.length > 0){
                  return HomeList(songs: snapshot.data);
                }

                  return Center(child: Text('Nothing was found', style: TextStyle(color: Colors.white),),);

              },
            )

        ),
      ],
    );
  }
}
