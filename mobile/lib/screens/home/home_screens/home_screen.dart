import 'package:artifex/models/user.dart';
import 'package:artifex/screens/home/home_screens/home_future.dart';
import 'package:artifex/screens/home/home_screens/home_stream.dart';
import 'package:artifex/screens/home/home_screens/search_bar.dart';
import 'package:artifex/services/auth.dart';
import 'package:artifex/services/database_music_service.dart';
import 'package:artifex/shared/standard_background.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

import 'home_future_event.dart';

class HomeScreen extends StatelessWidget {
  final Function toPlayer;

  HomeScreen({this.toPlayer});

  @override
  Widget build(BuildContext context) {
    final uid = Provider
        .of<User>(context)
        .UID;
    return Container(
      decoration: appBackground(),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          actions: [
            IconButton(
                icon: Icon(Icons.search),
                onPressed: () =>
                    showSearch(context: context, delegate: SearchBar())),
            IconButton(
              icon: Icon(Icons.logout),
              onPressed: () => AuthService().signOut(),
            )
          ],
          backgroundColor: Colors.transparent,
          elevation: 0.0,
          centerTitle: true,

        ),
        body: Container(
          padding: EdgeInsets.fromLTRB(
              MediaQuery
                  .of(context)
                  .size
                  .width * .05,
              MediaQuery
                  .of(context)
                  .size
                  .height * .001,
              MediaQuery
                  .of(context)
                  .size
                  .width * .05,
              0),
          child: SingleChildScrollView(
            child: Column(
              mainAxisSize: MainAxisSize.min,
              children: <Widget>[
                HomeSection_Stream(sectionTitle: 'My Library', query: DatabaseMusicService().getLikedSongsStream(uid), uid: uid,),
                HomeSection_Future(sectionTitle: 'Recently Added', query: DatabaseMusicService().getRecentlyAdded()),
                HomeSection_Future_Event(sectionTitle: 'Events', query: DatabaseMusicService().getEvents(),)
              ],
            ),
          ),
        ),
      ),
    );
  }
}


