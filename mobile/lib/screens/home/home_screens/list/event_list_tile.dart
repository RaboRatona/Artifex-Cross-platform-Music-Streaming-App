import 'package:artifex/models/event.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class EventTile extends StatelessWidget {
  final Event event;
  final Function function;

  EventTile({this.event, this.function});

  @override
  Widget build(BuildContext context) {
    return InkWell(
      onTap: function,
      child: Card(
        color: Colors.blue,
        child: Container(
          child: Center(child: Image.network(event.coverURL)),
        ),
      ),
    );
  }
}