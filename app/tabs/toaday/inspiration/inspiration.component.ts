import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { addInspireCollection, getInspiresProfile, removeInspireCollection } from "../../../shared/api";
import { LocalStorage } from "../../../shared/utils.localstorage";

@Component({
    selector: "inspiration",
    moduleId: module.id,
    templateUrl: "./inspiration.component.html",
    styleUrls: ["./inspiration.component.css"]
})
export class InspirationComponent implements OnInit, OnDestroy {

    getInspires: any;
    isCollect: number;
    feedback: Feedback;
    isLogin: string;
    querySubscription: Subscription;

    constructor(
        private apollo: Apollo,
        private routerExtensions: RouterExtensions
    ) { }

    ngOnInit() {
        this.getInspirationList();
    }

    onClickCollect(isCollect: any, id: number) {
        this.isLogin = LocalStorage.getObject("IS_LOGIN");
        if (this.isLogin) {
            if (isCollect) { // 取消收藏
                this.apollo.mutate({
                    mutation: removeInspireCollection,
                    variables: {
                        id,
                        repoFullName: "apollographql/apollo-client"
                    }
                }).subscribe(({ data }) => {
                    this.getInspirationList();
                }, (error) => {
                    this.feedback.show({
                        title: "Message!",
                        titleColor: new Color("#222222"),
                        message: "Please check your network!",
                        messageColor: new Color("#333333"),
                        duration: 2000,
                        backgroundColor: new Color("#ffc107")
                    });
                });
            } else { // 收藏
                this.apollo.mutate({
                    mutation: addInspireCollection,
                    variables: {
                        id,
                        repoFullName: "apollographql/apollo-client"
                    }
                }).subscribe(({ data }) => {
                    this.getInspirationList();
                }, (error) => {
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
        } else {
            this.routerExtensions.navigate(["/login"], { clearHistory: true });
        }
    }

    getInspirationList() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getInspiresProfile
        }).valueChanges.subscribe(({ data }) => {
            this.getInspires = data.getInspires.inspires;
        });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }
}
