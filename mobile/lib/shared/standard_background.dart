import 'package:flutter/cupertino.dart';

BoxDecoration appBackground() {
  return BoxDecoration(
    gradient: LinearGradient(
      begin: Alignment.topCenter,
      end: Alignment.bottomCenter,
      colors: [
        //251	220	223
        Color.fromRGBO(251, 220, 223, .8),
        Color.fromRGBO(239, 82, 97, 1),
        Color.fromRGBO(239, 82, 97, 1),
        //Color(0xff61e88a),
      ],
    ),
  );
}
