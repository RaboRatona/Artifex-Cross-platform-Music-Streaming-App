import 'dart:async';

import 'package:artifex/models/event.dart';
import 'package:artifex/models/song.dart';
import 'package:artifex/screens/home/home_screens/list/event_list.dart';
import 'package:artifex/screens/home/playlist/playlist.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

import 'list/home_list.dart';


class HomeSection_Future_Event extends StatelessWidget {
  final String sectionTitle;
  final Future<List<Event>> query;

  HomeSection_Future_Event(
      {this.sectionTitle, this.query});
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
                    fontSize: MediaQuery.of(context).size.height * .04)),
          ],
        ),
        Container(
          height: MediaQuery.of(context).size.height * .24,
          width: MediaQuery.of(context).size.width,
          child: FutureBuilder(
            future: query,
            builder:
                ((BuildContext context, AsyncSnapshot<List<Event>> snapshot) {
              if (snapshot.hasData && snapshot.data.length > 0) {
                return EventList(events: snapshot.data);
              } else if (snapshot.hasData && snapshot.data.length == 0) {
                return Center(child: Text('Nothing was found', style: TextStyle(color: Colors.white),),);
              } else {
                return CircularProgressIndicator();
              }
            }),
          ),
        ),
      ],
    );
  }
}
