import 'package:cloud_firestore/cloud_firestore.dart';

class Event{
  String coverURL;
  String description;
  Timestamp endDate;
  Timestamp startDate;
  String eventTitle;
  String location;
  String compuTicket;

  Event({this.coverURL, this.description, this.endDate,
  this.startDate, this.eventTitle, this.location, this.compuTicket});

  Map<String, dynamic> toMap() {
    return {
      'coverURL': coverURL,
      'description': description,
      'endDate': endDate,
      'startDate': startDate,
      'eventTitle': eventTitle,
      'location': location,
      'compuTicket': compuTicket
    };
  }
}