import { Component, ElementRef, Input, OnInit, ViewChild } from "@angular/core";
import { openAppSettings, openSettings, openWifiSettings } from "nativescript-advanced-permissions/core";
import {
    hasLocationPermissions,
    isLocationEnabled, requestLocationPermissions
} from "nativescript-advanced-permissions/location";
import * as geolocation from "nativescript-geolocation";
// tslint:disable-next-line:no-duplicate-imports
import { getCurrentLocation, Location } from "nativescript-geolocation";
import { Observable } from "tns-core-modules/data/observable";
import { Accuracy } from "ui/enums";
import { LoadEventData, WebView } from "ui/web-view";
@Component({
    selector: "Kaaba",
    moduleId: module.id,
    templateUrl: "./kaaba.component.html",
    styleUrls: ["./kaaba.component.css"]
})
export class KaabaComponent implements OnInit {
    @Input() kIndex;
    @ViewChild("myWebView") webViewRef: ElementRef;
    location: Observable = new Observable();
    webViewSrc: string = "https://qiblafinder.withgoogle.com";
    direction: number = 300;
    title: string;
    settings: Observable = new Observable();
    LOCATION_MESSAGES: {
        GRANTED: string,
        DENIED: string
    } = {
            GRANTED: "Location Permissions Granted",
            DENIED: "Location Permissions Denied"
        };
    constructor() {
        const appSettings = new Observable();
        appSettings.set("message", "Click the Button Below to Open App Settings");
        this.location.set("message",
            hasLocationPermissions() ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);
        this.location.set("hasPermission", hasLocationPermissions());
        this.location.set("coords", "0, 0");
    }
    ngOnInit() {
        this.requestLocationPermissions();
    }
    goBack() {
        const webview: WebView = this.webViewRef.nativeElement;
        if (webview.canGoBack) {
            webview.goBack();
        }
    }
    requestLocationPermissions() {
        console.log("requestLocationPermissions START");
        console.log("requesting location permission");
        requestLocationPermissions().then((hasPermission) => {
            console.log(`permission ${hasPermission ? "granted" : "denied"}`);
            this.location.set("hasPermission", hasPermission);
            this.location.set("message",
                hasPermission ? this.LOCATION_MESSAGES.GRANTED : this.LOCATION_MESSAGES.DENIED);

            return getCurrentLocation({ desiredAccuracy: Accuracy.high });
        }).then((location: Location) => {
            this.location.set("coords", `${location.latitude}, ${location.longitude}`);
        });
    }
    goToAppSettings() {

        openAppSettings().then(() => {
            const appSettings = this.settings.get("app");

            appSettings.set("message", "Welcome back to the application");
            this.settings.set("app", appSettings);
        });
    }

    goToSettings() {
        openSettings().then(() => {
            this.settings.set("message", "Welcome back to the application");
        });
    }
}
