import { Component, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Feedback } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { LocalStorage } from "~/shared/utils.localstorage";
import { getHlc } from "../shared/api";
@Component({
    selector: "wallet",
    moduleId: module.id,
    templateUrl: "./wallet.component.html",
    styleUrls: ["./wallet.component.css"]
})

export class WalletComponent implements OnInit {
    hlc = [{ name: "HLC", value: "0.0000" }];
    wallet: any;
    login: string = "IS_LOGIN";
    feedback: Feedback;
    loginStaues: any;
    constructor(private apollo: Apollo) {
        this.loginStaues = LocalStorage.getObject(this.login);
        this.feedback = new Feedback();
    }
    ngOnInit() {
        this.getHlcTime();
    }
    getHlcTime() {
        if (this.loginStaues) {
            this.apollo.watchQuery<any>({
                query: getHlc
            })
                .valueChanges
                .subscribe(({ data }) => {
                    const persion = data.getHlc.hlc.total;
                    // tslint:disable-next-line:prefer-conditional-expression
                    if (persion === 0) {
                        this.hlc[0].value = "0.0000";
                    } else {
                        this.hlc[0].value = persion;
                    }
                }, (err) => {
                    // tslint:disable-next-line:no-unused-expression
                    this.feedback && this.feedback.show({
                        title: "Message!",
                        titleColor: new Color("#222222"),
                        message: "Please check your network!",
                        messageColor: new Color("#333333"),
                        duration: 2000,
                        backgroundColor: new Color("#ffc107")
                    });
                });
        } else {
            // tslint:disable-next-line:no-unused-expression
            this.feedback && this.feedback.show({
                title: "Message!",
                titleColor: new Color("#222222"),
                message: "Please Login!",
                messageColor: new Color("#333333"),
                duration: 2000,
                backgroundColor: new Color("#ffc107")
            });
        }
    }
}
