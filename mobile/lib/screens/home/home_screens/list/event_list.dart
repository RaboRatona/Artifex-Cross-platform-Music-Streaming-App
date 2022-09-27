import 'package:artifex/screens/home/home_screens/list/event_list_tile.dart';
import 'package:flutter/cupertino.dart';
import 'package:url_launcher/url_launcher.dart';

class EventList extends StatelessWidget {
  final events;

  EventList({this.events});

  void launchURL(String url){
    launch(url);
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        scrollDirection: Axis.horizontal,
        itemCount: events.length,
        itemBuilder: (context, index) {
          return Container(
            child: EventTile(
                event: events[index], function: () => launchURL(events[index].compuTicket)),
          );
        });
  }
}
