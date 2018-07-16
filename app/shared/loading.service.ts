import { Injectable } from "@angular/core";
const LoadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
@Injectable()
export class LoadingService {
    loader: any;
    constructor() {
        this.loader = new LoadingIndicator();
    }
    show() {
        this.loader.show(options);
    }
    hide() {
        this.loader.hide(options);
    }
}
export const options = {
    message: "Loading...",
    progress: 0.65,
    android: {
        indeterminate: true,
        cancelable: true,
        // tslint:disable-next-line:no-empty
        cancelListener(dialog) { },
        max: 100,
        progressNumberFormat: "%1d/%2d",
        progressPercentFormat: 0.53,
        progressStyle: 1,
        secondaryProgress: 1
    },
    ios: {
        details: "Additional detail note!",
        margin: 10,
        dimBackground: true,
        color: "#4B9ED6", // color of indicator and labels
        // background box around indicator
        // hideBezel will override this if true
        backgroundColor: "yellow",
        userInteractionEnabled: false, // default true. Set false so that the touches will fall through it.
        hideBezel: true
    }
};
