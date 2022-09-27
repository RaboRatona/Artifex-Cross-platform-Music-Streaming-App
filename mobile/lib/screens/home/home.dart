import 'package:artifex/screens/home/home_screens/home_screen.dart';
import 'package:flutter/material.dart';
import 'discover_screens//discover.dart';

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
        color: Colors.yellow,
        home: DefaultTabController(
          length: 2,
          child: new Scaffold(
            body: TabBarView(
              physics: NeverScrollableScrollPhysics(),
              children: [
                HomeScreen(),
                Discover(),
              ],
            ),
            bottomNavigationBar: new TabBar(
              tabs: [
                Tab(
                  icon: new Icon(Icons.home),
                  text: 'Home',
                ),
                Tab(
                  icon: new Icon(Icons.playlist_play),
                  text: 'Discover',
                ),
              ],
              labelColor: Colors.white,
              unselectedLabelColor: Colors.grey,
              indicatorSize: TabBarIndicatorSize.label,
              indicatorPadding: EdgeInsets.all(5.0),
              indicatorColor: Colors.red,
            ),
            backgroundColor: Color.fromRGBO(239, 82, 97, 1),
          ),
        )
    );
  }
}
