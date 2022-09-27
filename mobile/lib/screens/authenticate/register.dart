import 'package:artifex/screens/authenticate/RegisterSection.dart';
import 'package:artifex/services/auth.dart';
import 'package:artifex/shared/loading_screen.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

class Register extends StatefulWidget {
  final Function toggleView;

  Register({this.toggleView});

  @override
  _RegisterState createState() => _RegisterState();
}

class _RegisterState extends State<Register> {
  final AuthService _auth = AuthService();
  final _formKey = GlobalKey<FormState>();
  String email,
      password,
      firstName,
      lastName,
      bankAccount,
      phoneNumber,
      birthdayString,
      error = '';
  DateTime birthday;
  bool loading = false;
  TextEditingController _controller = new TextEditingController();
  final lastDate = DateTime.now().subtract(Duration(days: 6590));

  _selectDate(BuildContext context) async {
    final DateTime picked = await showDatePicker(
      context: context,
      initialDate: lastDate,
      // Refer step 1
      firstDate: DateTime(1900),
      lastDate: lastDate,
      errorFormatText: 'Enter valid date',
      builder: (BuildContext context, Widget child) {
        return Theme(
          data: ThemeData.light().copyWith(
            colorScheme: ColorScheme.dark(
              primary: Color.fromRGBO(239, 82, 97, 1),
              onPrimary: Colors.white,
              surface: Color.fromRGBO(239, 82, 97, 1),
              onSurface: Colors.black,
            ),
          ),
          child: child,
        );
      },
    );
    if (picked != null && picked != birthday)
      setState(() {
        birthday = picked;
        _controller.value =
            TextEditingValue(text: DateFormat('yyyy-MM-dd').format(birthday));
      });
  }

  @override
  Widget build(BuildContext context) {
    return loading
        ? Loading()
        : Scaffold(
            backgroundColor: Colors.white,
            body: Center(
              child: SingleChildScrollView(
                padding:
                    EdgeInsets.only(top: MediaQuery.of(context).padding.top),
                child: Stack(children: <Widget>[
                  Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.center,
                    children: <Widget>[
                      Container(
                        child: Stack(
                          children: <Widget>[
                            Positioned(
                              child: Container(
                                child: Center(
                                  child: Text(
                                    "Register",
                                    style: TextStyle(
                                        color: Colors.black,
                                        fontSize: 40,
                                        fontWeight: FontWeight.bold),
                                  ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                      Form(
                        key: _formKey,
                        child: Padding(
                          padding: EdgeInsets.all(30.0),
                          child: Column(
                            children: <Widget>[
                              Container(
                                padding: EdgeInsets.all(5),
                                decoration: BoxDecoration(
                                    color: Colors.white,
                                    borderRadius: BorderRadius.circular(10),
                                    boxShadow: [
                                      BoxShadow(
                                          color:
                                              Color.fromRGBO(143, 148, 251, .2),
                                          blurRadius: 20.0,
                                          offset: Offset(0, 10))
                                    ]),
                                child: Column(
                                  children: <Widget>[
                                    RegisterSection(
                                      hintText: 'Email',
                                      icon: Icon(Icons.email),
                                      validator: (val) => val.isEmpty
                                          ? 'Enter in an email'
                                          : null,
                                      onChanged: (val) {
                                        setState(() => email = val);
                                      },
                                      obscure: false,
                                    ),
                                    RegisterSection(
                                      hintText: 'Password',
                                      obscure: true,
                                      icon: Icon(Icons.lock),
                                      validator: (val) => val.length < 6
                                          ? 'Enter a password of 6+ characters long'
                                          : null,
                                      onChanged: (val) {
                                        setState(() => password = val);
                                      },
                                    ),
                                    RegisterSection(
                                        hintText: 'First Name',
                                        obscure: false,
                                        icon: Icon(Icons.person),
                                        validator: (val) => val.length < 2
                                            ? 'Enter in a name of at least 2 letters'
                                            : null,
                                        onChanged: (val) {
                                          setState(() => firstName = val);
                                        }),
                                    RegisterSection(
                                      hintText: 'Last Name',
                                      icon: Icon(Icons.person),
                                      validator: (val) => val.length < 2
                                          ? 'Enter in a last name of at least 2 letters'
                                          : null,
                                      obscure: false,
                                      onChanged: (val) {
                                        setState(() => lastName = val);
                                      },
                                    ),
                                    RegisterSection(
                                      hintText: 'Phone Number',
                                      icon: Icon(Icons.phone),
                                      validator: (val) => val.length != 10
                                          ? 'Please enter in a valid phone number'
                                          : null,
                                      obscure: false,
                                      onChanged: (val) {
                                        setState(() => phoneNumber = val);
                                      },
                                    ),
                                    RegisterSection(
                                      hintText: 'Bank Account Number',
                                      icon: Icon(Icons.monetization_on),
                                      validator: (val) => val.length < 10 ||
                                              val.length > 20
                                          ? 'Enter in a valid bank acount number'
                                          : null,
                                      obscure: false,
                                      onChanged: (val) {
                                        setState(() => bankAccount = val);
                                      },
                                    ),
                                    Container(
                                      padding: EdgeInsets.all(8.0),
                                      child: InkWell(
                                        onTap: () {
                                          _selectDate(
                                              context); // Call Function that has showDatePicker()
                                        },
                                        child: IgnorePointer(
                                          child: TextFormField(
                                            controller: _controller,
                                            decoration: InputDecoration(
                                                border: InputBorder.none,
                                                icon: const Icon(
                                                    Icons.calendar_today),
                                                hintText:
                                                    "Select Your Birthday",
                                                hintStyle: TextStyle(
                                                    color: Colors.grey[400])),
                                            validator: (val) => val.length == 10
                                                ? null
                                                : 'Select a birthday',
                                            onChanged: (val) {
                                              setState(
                                                  () => birthdayString = val);
                                            },
                                          ),
                                        ),
                                      ),
                                    )
                                  ],
                                ),
                              ),
                              SizedBox(
                                height: 40,
                              ),
                              Container(
                                height: 50.0,
                                child: RaisedButton(
                                  onPressed: () async {
                                    if (_formKey.currentState.validate()) {
                                      setState(() => loading = true);
                                      dynamic result = await _auth
                                          .registerWithEmailAndPassword(
                                              firstName,
                                              lastName,
                                              email,
                                              bankAccount,
                                              phoneNumber,
                                              birthday,
                                              password);
                                      if (result == null) {
                                        setState(() {
                                          //error = 'Please enter a valid Email';
                                          loading = false;
                                          widget.toggleView;
                                        });
                                      }
                                    }
                                  },
                                  shape: RoundedRectangleBorder(
                                      borderRadius:
                                          BorderRadius.circular(40.0)),
                                  padding: EdgeInsets.all(0.0),
                                  child: Ink(
                                    decoration: BoxDecoration(
                                        gradient: LinearGradient(
                                          colors: [
                                            Color.fromRGBO(239, 82, 97, 1),
                                            Color.fromRGBO(243, 117, 129, .6),
                                          ],
                                          begin: Alignment.centerLeft,
                                          end: Alignment.centerRight,
                                        ),
                                        borderRadius:
                                            BorderRadius.circular(15.0)),
                                    child: Container(
                                      constraints: BoxConstraints(
                                          maxWidth: 300.0, minHeight: 50.0),
                                      alignment: Alignment.center,
                                      child: Text(
                                        "Register",
                                        textAlign: TextAlign.center,
                                        style: TextStyle(
                                            color: Colors.white,
                                            fontWeight: FontWeight.bold),
                                      ),
                                    ),
                                  ),
                                ),
                              ),
                              Text(
                                error,
                                style:
                                    TextStyle(color: Colors.red, fontSize: 14),
                              ),
                              SizedBox(
                                height: 10,
                              ),
                              FlatButton(
                                height: 50,
                                minWidth: 300.0,
                                shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(18.0),
                                    side: BorderSide(color: Colors.red)),
                                onPressed: widget.toggleView,
                                child: Text(
                                  "Login",
                                  style: TextStyle(
                                      color: Color.fromRGBO(239, 82, 97, 1)),
                                ),
                              ),
                            ],
                          ),
                        ),
                      ),
                    ],
                  ),
                ]),
              ),
            ),
          );
  }
}
