class User {
  String UID, firstName, lastName, email, bankAccount, phoneNumber;
  DateTime birthday;



  User(this.UID, this.firstName, this.lastName, this.email, this.bankAccount,
      this.phoneNumber, this.birthday);


  User.overloadedConstructor(this.UID);
}