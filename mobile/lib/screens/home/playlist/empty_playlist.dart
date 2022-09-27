import 'package:artifex/shared/standard_background.dart';
import 'package:flutter/material.dart';

class EmptyPlaylist extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height,
      decoration: appBackground(),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        crossAxisAlignment: CrossAxisAlignment.center,
        children: <Widget>[
          Image.asset('assets/empty_playlist.png'),
          Text('No items found', style: TextStyle(color: Colors.white),)
        ],
      )
    );
  }
}
