import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { EventData } from "tns-core-modules/data/observable";
import { View } from "tns-core-modules/ui/core/view";
import { PanGestureEventData, SwipeGestureEventData } from "tns-core-modules/ui/gestures";
import { Page } from "tns-core-modules/ui/page";
import * as dialogs from "ui/dialogs";
import * as enums from "ui/enums";

import { AudioPlayer } from "../shared/audio-player.service";

import { LocalStorage } from "../shared/utils.localstorage";

@Component({
    selector: "Tasbih",
    moduleId: module.id,
    templateUrl: "./tasbih.component.html",
    styleUrls: ["./tasbih.component.css"]
})
export class TasbihComponent implements OnInit {
    @ViewChild("beadMove") angularBeadMove: ElementRef;
    beadMove: View;

    @ViewChild("beadLeft") angularBeadLeft: ElementRef;
    beadLeft: View;

    @ViewChild("beadRight") angularBeadRight: ElementRef;
    beadRight: View;

    audioTickPlayer: AudioPlayer;
    audioTockPlayer: AudioPlayer;

    isPlay: boolean = true;

    beadNumObj;

    localstorageKey: string = "TASBIH_BEAD_NUM_OBJ";

    constructor(private pageRoute: RouterExtensions) {
        this.audioTickPlayer = new AudioPlayer("~/assets/raw/tick.mp3");
        this.audioTockPlayer = new AudioPlayer("~/assets/raw/tock.mp3");

        this.beadNumObj = LocalStorage.getObject(this.localstorageKey) || {
            currentNum: 0,
            roundNum: 99,
            total: 0
        };
    }

    ngOnInit() {
        this.beadMove = this.angularBeadMove.nativeElement;
        this.beadLeft = this.angularBeadLeft.nativeElement;
        this.beadRight = this.angularBeadRight.nativeElement;

        this.beadMove.translateX = 0;
        this.beadMove.translateY = 0;

        this.beadLeft.translateX = 0;
        this.beadLeft.translateY = 0;

        this.beadRight.translateX = 0;
        this.beadRight.translateY = 0;
    }

    onSwipe(args: SwipeGestureEventData) {
        const type = ["right", "left"][args.direction - 1];
        this._beadMoveAnimate(type);
        this._beadLeftAnimate(type);
        this._beadRightAnimate(type);
    }

    resetBeadNum() {
        dialogs.confirm({
            message: "Reset your current and rosary totals to 0? \n It can't be undone",
            okButtonText: "Reset",
            cancelButtonText: "Cancel"
        }).then((result) => {
            // result argument is boolean
            if (result) {
                this.beadNumObj.currentNum = 0;
                this.beadNumObj.roundNum = 99;
                this.beadNumObj.total = 0;
                this._setBeadNumObj2LocalStorage();
            }
        });
    }

    toggleVoice() {
        this.isPlay = !this.isPlay;
    }

    toggleRoundType() {
        this.beadNumObj.roundNum = this.beadNumObj.roundNum === 99 ? 33 : 99;
        if (this.beadNumObj.currentNum > this.beadNumObj.roundNum) {
            this.beadNumObj.currentNum = this.beadNumObj.currentNum - this.beadNumObj.roundNum;
        }
        this._setBeadNumObj2LocalStorage();
    }

    _beadMoveAnimate(type: string): void {
        const translateX = {
            start: { right: 0, left: 155 },
            end: { right: 155, left: 0 }
        };
        const translateY = {
            start: { right: 0, left: -84 },
            end: { right: -84, left: 0 }
        };

        this.beadMove.opacity = 1;
        this.beadMove.translateX = translateX.start[type];
        this.beadMove.translateY = translateY.start[type];

        this.beadMove.animate({
            translate: { x: translateX.end[type], y: translateY.end[type] },
            duration: 500,
            curve: enums.AnimationCurve.cubicBezier(.15, .87, .67, .82)
        }).then(() => {
            this.beadMove.opacity = 0;
            if (this.isPlay) {
                this._playAudio(type);
            }
            this._setBeadNum(type);
        });
    }

    _beadLeftAnimate(type: string): void {
        const translateX = {
            start: { right: -37, left: 0 },
            end: { right: 0, left: -37 }
        };
        const translateY = {
            start: { right: 24, left: 0 },
            end: { right: 0, left: 24 }
        };

        this.beadLeft.translateX = translateX.start[type];
        this.beadLeft.translateY = translateY.start[type];

        this.beadLeft.animate({
            opacity: 1,
            translate: { x: translateX.end[type], y: translateY.end[type] },
            duration: 500
        }).then(() => {
            if (type === "left") {
                this.beadLeft.translateX = translateX.start[type];
                this.beadLeft.translateY = translateY.start[type];
            }
        });
    }

    _beadRightAnimate(type: string): void {
        const translateX = {
            start: { right: 0, left: 43 },
            end: { right: 43, left: 0 }
        };
        const translateY = {
            start: { right: 0, left: -20 },
            end: { right: -20, left: 0 }
        };

        this.beadRight.translateX = translateX.start[type];
        this.beadRight.translateY = translateY.start[type];

        this.beadRight.animate({
            opacity: 1,
            translate: { x: translateX.end[type], y: translateY.end[type] },
            duration: 500
        }).then(() => {
            if (type === "right") {
                this.beadRight.translateX = translateX.start[type];
                this.beadRight.translateY = translateX.start[type];
            }
        });
    }

    _playAudio(type: string): void {
        if (type === "right") {
            this.audioTickPlayer.togglePlay();
        } else {
            this.audioTockPlayer.togglePlay();
        }
    }
    goBack() {
        this.pageRoute.backToPreviousPage();
    }
    _setBeadNum(type: string): void {
        if (type === "right") {
            this.beadNumObj.currentNum =
                this.beadNumObj.currentNum === this.beadNumObj.roundNum ? 1 : this.beadNumObj.currentNum += 1;
            this.beadNumObj.total += 1;
        } else {
            this.beadNumObj.currentNum =
                this.beadNumObj.currentNum > 0 ? this.beadNumObj.currentNum -= 1 : 0;

            this.beadNumObj.total =
                this.beadNumObj.total > 0 ? this.beadNumObj.total -= 1 : 0;
        }
        this._setBeadNumObj2LocalStorage();
    }

    _setBeadNumObj2LocalStorage() {
        LocalStorage.setObject(this.localstorageKey, this.beadNumObj);
    }
}
