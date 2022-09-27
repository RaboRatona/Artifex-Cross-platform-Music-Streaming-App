import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';

class RegisterSection extends StatelessWidget{
  final hintText;
  final icon;
  final validator;
  final onChanged;
  final obscure;
  RegisterSection({this.hintText, this.icon, this.validator, this.onChanged, this.obscure});
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(8.0),
      decoration: BoxDecoration(
          border: Border(
              bottom: BorderSide(
                  color: Colors.grey[100]))),
      child: TextFormField(
        decoration: InputDecoration(
            icon: icon,
            border: InputBorder.none,
            hintText: hintText,
            hintStyle: TextStyle(
                color: Colors.grey[400])),
        validator: validator,
        obscureText: obscure,
        onChanged: onChanged,
      ),
    );
  }

}