import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { RouterExtensions } from "nativescript-angular/router";
// tslint:disable-next-line:no-duplicate-imports
import { PageRoute } from "nativescript-angular/router";
import { Feedback } from "nativescript-feedback";
import { switchMap } from "rxjs/operators";
import { Subject } from "rxjs/Subject";
import { Color } from "tns-core-modules/color";
import { addKoranChapterToBookMark, getKoranSelections, removeKoranChapterToBookMark } from "~/shared/api";
import { KoranPlayer } from "~/shared/audioplay.services";
import { LocalStorage } from "~/shared/utils.localstorage";
const loadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
@Component({
    selector: "koransecondarypage",
    moduleId: module.id,
    templateUrl: "./koransecondarypage.component.html",
    styleUrls: ["./koransecondarypage.component.scss"]
})
export class KoransecondarypageComponent implements OnInit, OnDestroy {
    login: string = "IS_LOGIN";
    currentIndex: any = -1;
    i: number = 0;
    toggle: boolean = false;
    loader: any;
    chapter: number = 1;
    pageNum: any = 1;
    isPlay: boolean = true;
    title: string;
    feedback: Feedback;
    isMark: boolean;
    chapterID: string = "CHAPTER_ID";
    currentPlay: any;
    playInex: number;
    isPlayShow: boolean = true;
    querySubscription: Subscription;
    // tslint:disable-next-line:member-ordering
    items = [];
    constructor(
        private apollo: Apollo,
        private routerExtensions: RouterExtensions,
        private pageRoute: PageRoute
    ) {
        this.loader = new loadingIndicator();
        this.feedback = new Feedback();
    }
    ngOnInit() {
        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => { this.chapter = params.id; });
        this.queryData();
        this.title = LocalStorage.get("CHAPTER_TITTLE");
    }
    goBack() {
        // tslint:disable-next-line:no-unused-expression
        this.currentPlay && this.currentPlay.pause();
        this.routerExtensions.backToPreviousPage();
    }
    queryData() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getKoranSelections,
            variables: {
                chapterNo: this.chapter,
                pageNumber: this.pageNum,
                pageSize: 10
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.pageNum += 1;
                data.getQuranSections.sections.forEach((e) => {
                    this.items.push({
                        length: `${this.chapter}:0${e.no}`,
                        isMark: e.isMark,
                        no: e.no,
                        arabicAudioUrl: e.arabicAudioUrl,
                        content: e.englishContent,
                        text: e.arabicContent
                    });
                });
            });
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
    loadMoreItems() {
        this.queryData();
    }

    playChooseSection(file: any, index: any) {
        this.currentPlay = new KoranPlayer(file);
        this.playInex = index;
        this.currentPlay.play();
    }
    audioPlayMusic() {
        if (this.currentPlay) {
            this.currentPlay.togglePlay();
            this.isPlay = !this.isPlay;
        }
    }
    isPlayControl() {
        this.isPlayShow = false;
    }
    audioPlayPrev() {
        this.isPlay = true;
        if (this.playInex > 0) {
            this.currentPlay = new KoranPlayer(this.items[this.playInex - 1].arabicAudioUrl);
            this.playInex--;
        } else {
            this.feedback.show({
                title: "Message!",
                titleColor: new Color("#fff"),
                message: "已经是第一节了!",
                messageColor: new Color("#fff"),
                duration: 2000,
                backgroundColor: new Color(90, 0, 0, 0)
            });
        }

    }
    audioPlayNext() {
        this.isPlay = true;
        if (this.playInex < this.items.length - 1) {
            this.currentPlay = new KoranPlayer(this.items[this.playInex + 1].arabicAudioUrl);
            this.playInex++;
        } else {
            this.feedback.show({
                title: "Message!",
                titleColor: new Color("#fff"),
                message: "已经是最后一节了!",
                messageColor: new Color("#fff"),
                duration: 2000,
                backgroundColor: new Color(90, 0, 0, 0)
            });
        }
    }
    ngOnDestroy() {
        this.querySubscription.unsubscribe();
        // tslint:disable-next-line:no-unused-expression
        this.currentPlay && this.currentPlay.pause();
    }
}
