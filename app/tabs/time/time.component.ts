import { AfterViewInit, Component, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import * as moment from "moment";
import {
    hasLocationPermissions,
    isLocationEnabled, requestLocationPermissions
} from "nativescript-advanced-permissions/location";
import { getCurrentLocation, Location } from "nativescript-geolocation";
// tslint:disable-next-line:no-duplicate-imports
import * as geolocation from "nativescript-geolocation";
import firebase = require("nativescript-plugin-firebase");
import "rxjs/add/operator/map";
import { Observable } from "tns-core-modules/data/observable";
// used to describe at what accuracy the location should be get
import { Accuracy } from "ui/enums";
import { disablePush, enablePush, getPrayer, savePushInfo } from "../../shared/api";
import {  Query } from "./types";
@Component({
    selector: "Time",
    moduleId: module.id,
    templateUrl: "./time.component.html",
    styleUrls: ["./time.component.css"]
})
export class TimeComponent implements AfterViewInit, OnInit {
    LOCATION_MESSAGES: {
        GRANTED: string,
        DENIED: string
    } = {
            GRANTED: "Location Permissions Granted",
            DENIED: "Location Permissions Denied"
        };
    postsRef: QueryRef<Query>;
    getDataPrayer = [];
    location: Observable = new Observable();
    alarmClock: any;
    differenceTime: any = null;
    constructor(
        private apollo: Apollo
    ) {
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
    ngAfterViewInit(): void {
        moment.locale("en");
        let longitude;
        let latitude;
        geolocation.enableLocationRequest().then(() => {
            geolocation.getCurrentLocation({ desiredAccuracy: Accuracy.high, maximumAge: 5000, timeout: 3000 })
                .then((location) => {
                    latitude = location.latitude;
                    longitude = location.longitude;
                    this.getFireBaseToken(longitude, latitude);
                }, (err) => {
                    this.getFireBaseToken("timeout", "timeout");
                    console.log(11111111111111111111111111111111111111111111111111111, err);
                });

        }, (e) => {
            console.log("Background enableLocationRequest error: " + (e.message || e));
        });
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
    getFireBaseToken(longitude, latitude) {
        firebase.getCurrentPushToken()
            .then((token: string) => {
                const timeZone = moment.parseZone((new Date())).utcOffset() / 60;
                if (token) {
                    this.apollo.mutate({
                        mutation: savePushInfo,
                        variables: {
                            timeZone,
                            longitude,
                            latitude,
                            token,
                            repoFullName: "apollographql/apollo-client"
                        }
                    }).subscribe(({ data }) => {
                        const datas = data.savePushInfo;
                        const code = datas.code;
                        if (code === 200) {
                            this.getPrayer();
                        }
                    }, (error) => {
                        console.log("there was an error sending the query", error);
                    });
                }
            });
    }
    onTap(type, isEnable) {
        let mutation = enablePush;
        if (isEnable) {
            mutation = disablePush;
        }
        this.apollo.mutate({
            mutation,
            variables: {
                type,
                repoFullName: "apollographql/apollo-client"
            }
        }).subscribe(({ data }) => {
            const datas = data.enablePush ? data.enablePush : data.disablePush ? data.disablePush : "";
            const code = datas.code;
            if (code === 200) {
                this.getPrayer();
            }
        }, (error) => {
            //
        });
    }

    getPrayer() {
        moment.locale("en");
        const ymd = moment(new Date()).format("YYYY/MM/DD");
        const ymdArr = ymd.split("/");
        if (ymdArr && ymdArr.length > 0) {
            this.apollo.watchQuery<any>({
                query: getPrayer,
                variables: {
                    date: {
                        year: Number(ymdArr[0]),
                        month: Number(ymdArr[1]),
                        day: Number(ymdArr[2])
                    }
                }
            }).valueChanges.subscribe(({ data }) => {
                const datas = data.getPrayer;
                const code = datas.code;
                if (code === 200) {
                    this.getDataPrayer = [];
                    datas.prayer.times.forEach((e) => {
                        const hour = e.time.hour < 10 ? "0" + e.time.hour : e.time.hour;
                        const minute = e.time.minute < 10 ? "0" + e.time.minute : e.time.minute;
                        this.getDataPrayer.push({
                            type: e.type,
                            hour,
                            minute,
                            enable: e.enable
                        });
                    });
                    this.timingTask();
                }
            });
        }
    }

    timingTask() {
        setInterval(() => {
            const dayTime = moment(new Date().getTime()).valueOf();
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0; i < this.getDataPrayer.length; i++) {
                const time = this.getDataPrayer[i];
                // tslint:disable-next-line:max-line-length
                const nextTime = moment(moment().format("YYYY-MM-DD ") + time.hour + ":" + time.minute).valueOf();
                if ((nextTime - dayTime) > 0) {
                    const difference = (nextTime - dayTime);
                    // 计算出小时数
                    const hours = Math.floor(difference / (3600 * 1000));
                    // 计算小时数后剩余的毫秒数
                    const leave2 = difference % (3600 * 1000);
                    // 计算相差分钟数
                    const minutes = Math.floor(leave2 / (60 * 1000));
                    // 计算分钟数后剩余的毫秒数
                    const leave3 = leave2 % (60 * 1000);
                    // 计算相差秒数
                    const seconds = Math.round(leave3 / 1000);
                    this.differenceTime = "-" + hours + ":" + minutes + ":" + seconds;
                    // moment.unix().format("hh:mm:ss");
                    this.alarmClock = time.hour + ":" + time.minute;
                    break;
                }
            }
        }, 1000);
    }
}
