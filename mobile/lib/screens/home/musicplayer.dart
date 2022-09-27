import 'package:artifex/models/song.dart';
import 'package:artifex/models/user.dart';
import 'package:artifex/services/database_music_service.dart';
import 'package:artifex/services/local_database.dart';
import 'package:artifex/shared/standard_background.dart';
import 'package:auto_size_text/auto_size_text.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:video_player/video_player.dart';
import 'package:artifex/shared/capitalizer.dart';

class MusicPlayer extends StatefulWidget {
  final int index;
  final List<Song> queue;

  MusicPlayer({this.queue, this.index});

  @override
  _MusicPlayerState createState() => _MusicPlayerState();
}

class _MusicPlayerState extends State<MusicPlayer> {
  int index;
  VideoPlayerController _controller;
  VideoPlayer videoPlayer;
  Future<void> _initializeVideoPlayerFuture;
  double valueHolder = 0;
  bool playable;
  bool favourited;

  @override
  void initState() {
    // Using an mp3 file instead of mp4.
    index = widget.index;
    initMe();
    videoPlayer.controller.addListener(checkVideo);
    super.initState();
  }

  void checkVideo() {
    if(mounted){
      setState(() {
        if (_controller.value.position != null)
          valueHolder = _controller.value.position.inSeconds.toDouble();
        else
          valueHolder = 0;
      });
    }
  }

  String convertSecondsToMinuteSecond(int seconds) {
    if (seconds < 60 && seconds < 10) {
      return '0:0' + seconds.toString();
    } else if (seconds < 60 && seconds > 9) {
      return '0:' + seconds.toString();
    } else {
      int minutes = (seconds / 60).floor();
      int secondsLeft = seconds - (minutes * 60);
      return minutes.toString() + ":" + secondsLeft.toString();
    }
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final uid = Provider.of<User>(context).UID;
    return Container(
      decoration: appBackground(),
      child: Scaffold(
        backgroundColor: Colors.transparent,
        appBar: AppBar(
          title: Text(
            widget.queue[index].artistName.capitalizeFirstofEach,
            style: TextStyle(color: Colors.black),
          ),
          leading: IconButton(
            icon: Icon(Icons.arrow_back_ios, color: Colors.black),
            onPressed: () => Navigator.pop(context),
          ),
          actions: [
            InkWell(
              onTap: () async {
                DatabaseHelper().exists(widget.queue[index].songID).then(
                        (value) => {
                          if(value){
                            DatabaseHelper().insertSong(widget.queue[index]),
                            DatabaseMusicService().setLiked(widget.queue[index].songID, uid)
                          } else {
                            DatabaseHelper()
                                .deleteSongs(widget.queue[index].songID),
                            DatabaseMusicService().removeLiked(widget.queue[index].songID, uid)
                          },
                          if(mounted){
                            setState(()=>{})
                          }
                        });
              },
              child: FutureBuilder(
                future:
                DatabaseHelper().exists(widget.queue[index].songID),
                builder: ((BuildContext context, AsyncSnapshot<bool> snapshot) {
                  Widget toReturn;
                  if (snapshot.hasData) {
                    if (!snapshot.data) {
                      toReturn = Image.asset('assets/full_heart.png');
                    } else {
                      toReturn = Image.asset('assets/empty_heart.png');
                    }
                  } else {
                    return CircularProgressIndicator();
                  }

                  return toReturn;
                }),
              ),
            )
          ],
          backgroundColor: Colors.transparent,
          elevation: 0.0,
          centerTitle: true,
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            crossAxisAlignment: CrossAxisAlignment.center,
            children: <Widget>[
              SizedBox(
                height: 0,
                width: 0,
                child: FutureBuilder(
                  future: _initializeVideoPlayerFuture,
                  builder: (context, snapshot) {
                    if (snapshot.connectionState == ConnectionState.done) {
                      // not wrapped in an AspectRatio widget
                      return AspectRatio(
                        aspectRatio: _controller.value.aspectRatio,
                        // Use the VideoPlayer widget to display the video.
                        child: Row(children: <Widget>[
                          SizedBox(width: 0, height: 0.0, child: videoPlayer)
                        ]),
                      );
                    } else {
                      return Center(child: CircularProgressIndicator());
                    }
                  },
                ),
              ),
              Card(
                  elevation: 6,
                  margin: EdgeInsets.only(
                      left: MediaQuery.of(context).size.width * .1,
                      right: MediaQuery.of(context).size.width * .1,
                      top: MediaQuery.of(context).size.height * .002),
                  child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      children: <Widget>[
                        FadeInImage.assetNetwork(
                          placeholder: 'assets/placeholder.png',
                          image: widget.queue[index].coverURL,
                        ),
                      ])
                  /*Image.network(
                    widget.image,
                  ),*/
                  ),
              SizedBox(
                height: MediaQuery.of(context).size.height * .07,
              ),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: [
                AutoSizeText(
                  widget.queue[index].songTitle.capitalizeFirstofEach,
                  maxLines: 5,
                  minFontSize: 12,
                  style: TextStyle(
                    color: Colors.white,
                    letterSpacing: 0.5,
                    fontWeight: FontWeight.w400,
                  ),
                ),
                Container(
                  margin: EdgeInsets.only(bottom: 1.5),
                  child: widget.queue[index].explicit
                      ? Icon(
                          Icons.explicit,
                          color: Colors.grey,
                          size: 20,
                        )
                      : null,
                )
              ]),
              SizedBox(
                height: MediaQuery.of(context).size.height * .01,
              ),
              Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  AutoSizeText(
                    widget.queue[index].artistName.capitalizeFirstofEach,
                    style: TextStyle(
                      fontSize: 20,
                      color: Colors.white54,
                      letterSpacing: 0.5,
                      fontWeight: FontWeight.w300,
                    ),
                  ),
                ],
              ),
              SizedBox(height: MediaQuery.of(context).size.height * .01),
              SizedBox(
                height: MediaQuery.of(context).size.height * .10,
                width: MediaQuery.of(context).size.width * .9,
                child: Column(
                  children: <Widget>[
                    Padding(
                        padding: EdgeInsets.only(
                            left: MediaQuery.of(context).size.width * .05,
                            right: MediaQuery.of(context).size.width * .05),
                        child: Row(
                          mainAxisAlignment: MainAxisAlignment.spaceBetween,
                          children: <Widget>[
                            Text(
                              convertSecondsToMinuteSecond(valueHolder.toInt()),
                              style: TextStyle(color: Colors.white),
                            ),
                            Text(
                              convertSecondsToMinuteSecond(
                                  ((this._controller?.value?.initialized ??
                                          false)
                                      ? _controller.value.duration.inSeconds
                                      : 0)),
                              style: TextStyle(color: Colors.white),
                            ),
                          ],
                        )),
                    Center(
                        child: Slider(
                            value: valueHolder == null || valueHolder == 0 ? valueHolder : 20,
                            min: 0,
                            max:
                                ((this._controller?.value?.initialized ?? false)
                                        ? _controller.value.duration.inSeconds
                                        : 20.0)
                                    .toDouble(),
                            divisions: 100,
                            activeColor: Color.fromRGBO(248, 185, 191, 1),
                            inactiveColor: Colors.white,
                            label: '${valueHolder.round()}',
                            onChanged: (double newValue) {
                              _controller
                                  .seekTo(Duration(seconds: newValue.round()));
                              if(mounted){
                                setState(() {
                                  valueHolder = newValue;
                                  _controller.play();
                                });
                              }
                            },
                            semanticFormatterCallback: (double newValue) {
                              return '${newValue.round()}';
                            })),
                  ],
                ),
              ),
              Row(mainAxisAlignment: MainAxisAlignment.center, children: <
                  Widget>[
                FlatButton(
                    onPressed: () => {
                          if (index == 0)
                            {_controller.seekTo(Duration(seconds: 0))},
                          if (index - 1 >= 0)
                            {
                              if (valueHolder > 3)
                                {_controller.seekTo(Duration(seconds: 0))}
                              else
                                {
                                  if(mounted){
                                    setState(
                                            () => index = index - 1),
                                    //_controller.dispose(),
                                  },
                                  initMe(),
                                  //initState(),
                                  _controller.play()
                                  }

                            }
                        },
                    child: const Icon(
                      Icons.skip_previous,
                      color: Colors.white,
                      size: 57,
                    )),
                FlatButton(
                    onPressed: () {
                      if(mounted){
                        setState(() {
                          if (_controller.value.isPlaying) {
                            _controller.pause();
                          } else {
                            _controller.play();
                          }
                        });
                      }
                    },
                    child: _controller.value.isPlaying
                        ? const Icon(
                            Icons.pause_circle_outline,
                            color: Colors.white,
                            size: 57,
                          )
                        : const Icon(
                            Icons.play_circle_outline,
                            color: Colors.white,
                            size: 57,
                          )),
                FlatButton(
                    onPressed: () => {
                          if (index + 1 <= widget.queue.length - 1)
                            {
                              if(mounted){
                                setState(() => index = index + 1),
                              },

                              //_controller.dispose(),
                              initMe(),
                              //initState(),
                              _controller.play()
                            }
                        },
                    child: const Icon(
                      Icons.skip_next,
                      color: Colors.white,
                      size: 57,
                    )),
              ]),
            ],
          ),
        ),
      ),
    );
  }

  initMe() {
    _controller = VideoPlayerController.network(
      widget.queue[index].songURL,
    );
    _initializeVideoPlayerFuture = _controller.initialize().then((_) {
      print('');
      debugPrint("========" + _controller.value.duration.toString());
    });
    _controller.setLooping(false);
    DatabaseMusicService().updatePlays(widget.queue[index].songID);
    videoPlayer = VideoPlayer(_controller);
    // This line causes a null exception due to the playing not having started yet
  }
}
