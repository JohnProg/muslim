import { TNSPlayer } from "nativescript-audio-player";

export class AudioPlayer {
    _player: TNSPlayer;
    constructor(filePath) {
        this._player = new TNSPlayer();
        //
        this._player
            .initFromFile({
                audioFile: filePath, // ~ = app directory
                loop: false,
                completeCallback: this._trackComplete.bind(this),
                errorCallback: this._trackError.bind(this)
            })
            .then(() => {
                this._player.getAudioTrackDuration().then((duration) => {
                    // iOS: duration is in seconds
                    // Android: duration is in milliseconds
                });
            });
    }

    togglePlay() {
        if (this._player.isAudioPlaying()) {
            this._player.pause();
        } else {
            this._player.play();
        }
    }

    _trackComplete(args: any) {
        //
    }

    _trackError(args: any) {
        //
    }
}
