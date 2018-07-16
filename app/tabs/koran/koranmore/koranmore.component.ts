import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { PageRoute } from "nativescript-angular/router";
// tslint:disable-next-line:no-duplicate-imports
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { bookMarks, removeKoranChapterToBookMark } from "~/shared/api";
import { KoranReadService } from "~/shared/koranread.services";
import { LocalStorage } from "~/shared/utils.localstorage";
@Component({
    selector: "koranmore",
    moduleId: module.id,
    templateUrl: "./koranmore.component.html",
    styleUrls: ["./koranmore.component.scss"]
})
export class KoranmoreComponent implements OnInit {
    loginStaues: boolean;
    feedback: Feedback;
    isDis: string = "Please Sign In! Click me to login";
    pageNum: number = 1;
    pageSize: number = 10;
    login: string = "IS_LOGIN";
    querySubscription: Subscription;
    messageSubscription: Subscription;
    items = [];
    dispreItem = [];
    isAdd = "";
    chapter: number;
    no: number;
    noPage: string = "LIST_NO";
    constructor(
        private apollo: Apollo,
        private routerExtensions: RouterExtensions,
        private pageRoute: PageRoute,
        private kr: KoranReadService
    ) {
        this.feedback = new Feedback();
        this.loginStaues = LocalStorage.getObject(this.login);
        this.kr.subject.subscribe(() => {
            this.getData();
        });
    }
    // tslint:disable-next-line:no-empty
    ngOnInit(): void {
        if (this.loginStaues) {
            this.getData();
            this.isAdd = "Please Add BookMark!";
            // tslint:disable-next-line:prefer-conditional-expression
            if (this.items.length === 0) {
                this.isAdd = "Please Add BookMark!";
            } else {
                this.isAdd = "";
            }
        }
    }
    refreshList(args) {
        this.getData();
        const pullRefresh = args.object;
        pullRefresh.refreshing = false;

    }
    getReadContent(index: any) {
        LocalStorage.set(this.noPage, index);
    }
    markSections(pno: any, pchapterNo: any, index: any) {
        if (this.loginStaues) {
            this.apollo.mutate({
                mutation: removeKoranChapterToBookMark,
                variables: {
                    chapterNo: pchapterNo,
                    no: pno
                }
            }).subscribe(({ data }) => {
                this.items.splice(index, 1);
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
        } else {
            this.feedback.show({
                title: "Message!",
                titleColor: new Color("#222222"),
                message: "Please login!",
                messageColor: new Color("#333333"),
                duration: 2000,
                backgroundColor: new Color("#ffc107")
            });
        }
    }
    queryData() {
        this.apollo.watchQuery<any>({
            query: bookMarks,
            variables: {
                pageSize: this.pageSize,
                pageNumber: this.pageNum
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                data.getBookMarks.sections.forEach((e) => {
                    this.pageNum += 1;
                    this.items.push({
                        length: `${e.chapterNo}:00${e.no}`,
                        no: e.no,
                        chapterNo: e.chapterNo,
                        content: e.englishContent,
                        text: e.arabicContent
                    });
                });
                this.dispreItem = data.getBookMarks.sections;
            });
    }
    getData() {
        this.apollo.watchQuery<any>({
            query: bookMarks,
            variables: {
                pageSize: 10,
                pageNumber: 1
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.items = [];
                data.getBookMarks.sections.forEach((e) => {
                    this.items.push({
                        length: `${e.chapterNo}:00${e.no}`,
                        no: e.no,
                        chapterNo: e.chapterNo,
                        content: e.englishContent,
                        text: e.arabicContent
                    });
                });
                this.pageNum = 1;
            });
    }
    goLogin() {
        if (this.loginStaues === false) {
            this.routerExtensions.navigate(["/login"], { clearHistory: true });
        }
    }
    loadMoreItems() {
        if (this.dispreItem.length !== 0) {
            this.queryData();
        }
    }
}
