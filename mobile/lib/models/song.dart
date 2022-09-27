class Song{
  String artistName;
  String albumTitle;
  //int bpm;
  String coverURL;
  //String createdBy;
  bool explicit;
  String genre;
  String key;
  //int plays;
  //Timestamp releasedate;
  String songID;
  String songTitle;
  String songURL;

  Song({this.artistName, this.albumTitle, this.coverURL, this.explicit, this.genre, this.key, this.songID, this.songTitle, this.songURL});

  Map<String, dynamic> toMap() {
    return {
      'artistName': artistName,
      'songTitle': songTitle,
      'albumTitle': albumTitle,
      'coverURL': coverURL,
      'songURL': songURL,
      'explicit': explicit.toString(),
      'songID': songID,
    };
  }
}