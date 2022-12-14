import 'package:flutter/material.dart';
import 'package:flutter_spinkit/flutter_spinkit.dart';

class Loading extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      color: Color.fromRGBO(239, 82, 97, 1),
      child: Center(
        child: SpinKitWanderingCubes(
          color: Colors.white,
          size: 50,
        ),
      ),
    );
  }
}