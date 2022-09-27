import 'package:flutter/cupertino.dart';

class ScreenState with ChangeNotifier {
  LoadingState _currentScreenState = LoadingState.Pre;
  String _orderBy = '';
  String _orderByValue = '';

  LoadingState get currentScreenState => _currentScreenState;
  String get orderBy => _orderBy;
  String get orderByValue => _orderByValue;

  set currentScreenState(LoadingState state) {
    _currentScreenState = state;
    notifyListeners();
  }

  set orderBy(String orderBy){
    _orderBy = orderBy;
    notifyListeners();
  }

  set orderByValue(String orderByValue){
    _orderByValue = orderByValue;
    notifyListeners();
  }
}

enum LoadingState {
  Pre, Loading, Result
}