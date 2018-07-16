import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { Feedback } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { addKoranChapterToBookMark, getKoranSelections, removeKoranChapterToBookMark } from "~/shared/api";
import { LocalStorage } from "~/shared/utils.localstorage";
@Component({
    selector: "koransearch",
    moduleId: module.id,
    templateUrl: "./koransearch.component.html",
    styleUrls: ["./koransearch.component.css"]
})
export class KoransearchComponent implements OnInit, OnDestroy {
    sbHint = "Please enter the chapter number";
    chapter: any;
    flag: boolean = true;
    login: string = "IS_LOGIN";
    feedback: Feedback;
    pageNumber: number = 1;
    querySubscription: Subscription;
    noPage: string = "LIST_NO";
    // tslint:disable-next-line:member-ordering
    items = [];
    constructor(
        private apollo: Apollo,
        private route: ActivatedRoute) {
        this.feedback = new Feedback();
    }
    ngOnInit(): void {
        // Use the "ngOnInit" handler to initialize data for the view.
    }
    onClear() {
        this.sbHint = "";
    }
    submit() {
        this.pageNumber = 1;
        const inputChapter = /^[1-9]\d*|0$/;
        if (inputChapter.test(this.chapter)) {
            this.items = [];
            this.queryData();
        } else {
            this.feedback.show({
                title: "Message!",
                titleColor: new Color("#222222"),
                message: "请输入章节的序号！",
                messageColor: new Color("#333333"),
                duration: 2000,
                backgroundColor: new Color("#ffc107")
            });
        }
    }
    // tslint:disable-next-line:use-life-cycle-interface
    ngOnDestroy() {
        // tslint:disable-next-line:no-unused-expression
        this.querySubscription && this.querySubscription.unsubscribe();
    }
    getReadContent(index: any) {
        LocalStorage.set(this.noPage, index);
    }
    markSections(index: any, event: any) {
        const loginStaues = LocalStorage.getObject(this.login);
        if (loginStaues) {
            if (event.isMark) {
                this.apollo.mutate({
                    mutation: removeKoranChapterToBookMark,
                    variables: {
                        chapterNo: this.chapter,
                        no: index
                    }
                }).subscribe(({ data }) => {
                    event.isMark = !event.isMark;
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
                this.apollo.mutate({
                    mutation: addKoranChapterToBookMark,
                    variables: {
                        chapterNo: this.chapter,
                        no: index
                    }
                }).subscribe(({ data }) => {
                    event.isMark = !event.isMark;
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
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getKoranSelections,
            variables: {
                chapterNo: this.chapter,
                pageNumber: this.pageNumber,
                pageSize: 10
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                if (data.getQuranSections.sections.length === 0) {
                    // this.feedback.show({
                    //     title: "Message!",
                    //     titleColor: new Color("#222222"),
                    //     message: "输入的章节不存在哦！",
                    //     messageColor: new Color("#333333"),
                    //     duration: 1000,
                    //     backgroundColor: new Color("#ffc107")
                    // });
                } else {
                    data.getQuranSections.sections.forEach((e) => {
                        this.items.push({
                            length: `${this.chapter}:0${e.no}`,
                            isMark: e.isMark,
                            no: e.no,
                            content: e.englishContent,
                            text: e.arabicContent
                        });
                    });
                }
            });
    }
    loadMoreItems() {
        this.pageNumber += 1;
        this.queryData();
    }
}
