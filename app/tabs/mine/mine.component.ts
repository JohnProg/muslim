import { Component, DoCheck, OnInit } from "@angular/core";
import firebase = require("nativescript-plugin-firebase");
import { ItemEventData } from "ui/list-view";
import { LocalStorage } from "../../shared/utils.localstorage";
@Component({
    selector: "Mine",
    moduleId: module.id,
    templateUrl: "./mine.component.html",
    styleUrls: ["./mine.component.css"]
})
export class MineComponent implements OnInit, DoCheck {
    img = "res://icon_getinto";
    isLogin: boolean;
    countries = [];
    userInfo: string = "LOGIN_USER_INFO";
    onItemTap(args: ItemEventData): void {
        //
    }
    ngDoCheck() {
        if (this.isLogin) {
            this.countries = [
                { name: "About us", imageSrc: this.img, routerLink: "/about" },
                { name: "Wallet", imageSrc: this.img, routerLink: "/wallet" },
                { name: "HLC Candy", imageSrc: this.img, routerLink: "hlc" }
            ];
        } else {
            this.countries = [
                { name: "Sign in", imageSrc: this.img, routerLink: "/login" },
                { name: "Register", imageSrc: this.img, routerLink: "/register" },
                { name: "About us", imageSrc: this.img, routerLink: "/about" },
                { name: "Wallet", imageSrc: this.img, routerLink: "wallet" },
                { name: "HLC Candy", imageSrc: this.img, routerLink: "hlc"}
              ];
        }
    }
    // tslint:disable-next-line:member-ordering
    constructor() {
        const loginUserInfo = LocalStorage.getObject(this.userInfo);
        if (loginUserInfo) {
            firebase.login(
                {
                    type: firebase.LoginType.PASSWORD,
                    passwordOptions: {
                        email: loginUserInfo.email,
                        password: loginUserInfo.pass
                    }
                })
                .then((result) => {
                    this.isLogin = true;
                    LocalStorage.setObject("IS_LOGIN", this.isLogin);
                })
                .catch((error) => {
                    throw new error("Err" + error);
                });
        }
    }

    ngOnInit(): void {
        this.isLogin = LocalStorage.getObject("IS_LOGIN");
    }
}
