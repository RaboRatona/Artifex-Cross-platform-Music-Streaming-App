import 'package:artifex/models/genre.dart';
import 'package:flutter/material.dart';

class GenreTile extends StatelessWidget {
  final Genre genre;
  final Function function;

  GenreTile({this.genre, this.function});

  @override
  Widget build(BuildContext context) {
    return GridTile(
      child: Padding(
        padding: EdgeInsets.only(top: 8),
        child: Card(
          elevation: 6,
          child: InkWell(
            child: Image.asset(
              genre.assetURL,
              height: MediaQuery.of(context).size.height * .22,
              width: MediaQuery.of(context).size.width * .42,
              fit: BoxFit.fill,
            ),
            onTap: function,
          ),
        ),
      ),
    );
  }
}
