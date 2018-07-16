import { TNSPlayer } from "nativescript-audio-player";

export class KoranPlayer {
  _player: TNSPlayer;
  flag = false;
  constructor(filePath) {
    this._player = new TNSPlayer();
    this._player.debug = true;
    this._player
      .playFromUrl({
        audioFile: filePath, // ~ = app directory
        loop: false,
        completeCallback: this._trackComplete.bind(this)
      })
      .then(() => {
        this._player.getAudioTrackDuration().then((duration) => {
          // iOS: duration is in seconds
          // Android: duration is in milliseconds
          return duration;
        });
      });
  }
  pause() {
    this._player.pause();
  }
  play() {
    this._player.play();
  }
  togglePlay() {
    if (this._player.isAudioPlaying()) {
      this._player.pause();
    } else {
      this._player.play();
    }
  }
  getDurantion(): any {
    this._player.getAudioTrackDuration().then((duration) => {
      return duration;
    });
  }
  isAudioPlaying() {
    return this._player.isAudioPlaying();
  }
  dispose() {
    this._player.dispose();
  }
  _trackComplete(args: any) {
    this.flag = true;
  }
}
