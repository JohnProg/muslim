import { Component, OnInit } from "@angular/core";
import { init } from "nativescript-advanced-webview";
import { Feedback } from "nativescript-feedback";
import firebase = require("nativescript-plugin-firebase");
import { Color } from "tns-core-modules/color";
import { LocalStorage } from "./shared/utils.localstorage";

@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})

export class AppComponent implements OnInit {
    token: string = "TOKEN";
    feedback: Feedback;
    localstorageKey: string = "TAB_ANONYMOUS_LOGIN_KEY";
    anonymouseLoginKey: string;
    login: string = "IS_LOGIN";

    constructor() {
        this.firebaseLogin();
    }

    ngOnInit(): any {
        firebase.init(
            {
                persist: false
            })
            .then((_) => {
            //
            })
            .catch((err) => {
                //
            });
    }

    firebaseLogin() {
        const anonymouseLoginKey = LocalStorage.get(this.localstorageKey);
        if (anonymouseLoginKey) {
            this.getAuthToken();
        } else {
            firebase.login(
                {
                    type: firebase.LoginType.ANONYMOUS
                })
                .then((user) => {
                    LocalStorage.set(this.localstorageKey, user.uid);
                    this.getAuthToken();
                })
                .catch((error) => {
                    this.feedback.show({
                        title: "Message!",
                        titleColor: new Color("#222222"),
                        message: "Please check your network!",
                        messageColor: new Color("#333333"),
                        duration: 2000,
                        backgroundColor: new Color("#ffc107")
                    });
                });
        }
    }

    getAuthToken() {
        firebase.getAuthToken({
            forceRefresh: false
        }).then((token) => {
            const isSave = LocalStorage.set(this.token, token);
            if (isSave) {
                LocalStorage.setObject(this.login, false);
            }
        },
            (errorMessage) => {
                this.feedback.show({
                    title: "Message!",
                    titleColor: new Color("#222222"),
                    message: "登录失败",
                    messageColor: new Color("#333333"),
                    duration: 2000,
                    backgroundColor: new Color("#ffc107")
                });
            }
        );
    }
}
