import 'package:artifex/shared/standard_background.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'discover_list.dart';

class Discover extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: appBackground(),
        child: DiscoverList(),
      ),
    );
  }
}
