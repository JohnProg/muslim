import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
// tslint:disable-next-line:max-line-length
import { addKoranChapterToBookMark, getKoranCapter, getQuranSectionsByNo, removeKoranChapterToBookMark } from "~/shared/api";
const loadingIndicator = require("nativescript-loading-indicator").LoadingIndicator;
import { registerElement } from "nativescript-angular/element-registry";
import { PageRoute } from "nativescript-angular/router";
// tslint:disable-next-line:no-duplicate-imports
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback } from "nativescript-feedback";
import { switchMap } from "rxjs/operators";
import { Color } from "tns-core-modules/color";
import { KoranPlayer } from "~/shared/audioplay.services";
import { KoranReadService } from "~/shared/koranread.services";
import { LocalStorage } from "~/shared/utils.localstorage";
registerElement("PullToRefresh", () => require("nativescript-pulltorefresh").PullToRefresh);
@Component({
    selector: "koranread",
    moduleId: module.id,
    templateUrl: "./koranread.component.html",
    styleUrls: ["./koranread.component.scss"]
})
export class KoranreadComponent implements OnInit, OnDestroy {
    audioPath: "~/assets/koranplay/12.mp3";
    login: string = "IS_LOGIN";
    currentIndex: any = -1;
    no: any;
    toggle: boolean = false;
    loader: any;
    chapter: number = 1;
    pageNum: any = 1;
    isPlay: boolean = true;
    title: string = "";
    noPage: string = "LIST_NO";
    flag: boolean = true;
    feedback: Feedback;
    isMark: boolean;
    nowNum: number;
    passNum: number;
    finallNum: any;
    reFlag: boolean;
    currentPlay: any;
    playInex: number;
    isPlayShow: boolean = true;
    querySubscription: Subscription;
    // tslint:disable-next-line:member-ordering
    items = [];
    // tslint:disable-next-line:member-ordering
    arr = [];
    constructor(
        private apollo: Apollo,
        private routerExtensions: RouterExtensions,
        private pageRoute: PageRoute,
        private kr: KoranReadService
    ) {
        this.loader = new loadingIndicator();
        this.feedback = new Feedback();
    }
    ngOnInit() {
        this.pageRoute.activatedRoute.pipe(
            switchMap((activatedRoute) => activatedRoute.params)
        ).forEach((params) => { this.chapter = params.id; });
        this.no = LocalStorage.get(this.noPage);
        this.nowNum = this.no;
        this.passNum = this.no;
        this.queryData();
    }
    getRefresh(dataNum?: any, pullRefresh?: any) {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getQuranSectionsByNo,
            variables: {
                chapterNo: this.chapter,
                no: this.nowNum,
                limit: dataNum
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.arr = [];
                // tslint:disable-next-line:no-unused-expression
                data.getQuranSectionsByNo.sections && data.getQuranSectionsByNo.sections.forEach((e) => {
                    this.arr.push({
                        length: `${this.chapter}:0${e.no}`,
                        isMark: e.isMark,
                        no: e.no,
                        arabicAudioUrl: e.arabicAudioUrl,
                        content: e.englishContent,
                        text: e.arabicContent
                    });
                });
                this.finallNum = this.nowNum;
                this.items = this.arr.concat(this.items);
                pullRefresh.refreshing = false;
            });
    }
    getChapterTitle() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getKoranCapter,
            variables: {
                no: this.chapter
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.title = data.getQuranChapter.chapter.englishInfo.title;
            });
    }
    goBack() {
        this.kr.sendMessage(true);
        this.routerExtensions.backToPreviousPage();
        // tslint:disable-next-line:no-unused-expression
        this.currentPlay && this.currentPlay.pause();
    }
    refreshList(args) {
        let dataNum = 10;
        const pullRefresh = args.object;
        if (this.no > 10) {
            if (this.nowNum < 10) {
                dataNum = this.nowNum % 10 - 1;
                this.nowNum = 1;
            } else if (this.nowNum === 10) {
                this.nowNum = 1;
                dataNum = 9;
            } else {
                this.nowNum = this.nowNum - 10;
            }
            if (this.finallNum !== this.nowNum) {
                this.getRefresh(dataNum, pullRefresh);
            } else {
                pullRefresh.refreshing = false;
            }
        }
        pullRefresh.refreshing = false;
    }
    queryData() {
        let noNum = this.no;
        if (this.no < 10) {
            noNum = 1;
        }
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getQuranSectionsByNo,
            variables: {
                chapterNo: this.chapter,
                no: noNum,
                limit: 10
            }
        })
            .valueChanges
            .subscribe(({ data, loading }) => {
                this.passNum = this.passNum + 10;
                // tslint:disable-next-line:no-unused-expression
                data.getQuranSectionsByNo.sections && data.getQuranSectionsByNo.sections.forEach((e) => {
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
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getQuranSectionsByNo,
            variables: {
                chapterNo: this.chapter,
                no: this.passNum,
                limit: 10
            }
        })
            .valueChanges
            .subscribe(({ data }) => {
                this.passNum = this.passNum + 10;
                // tslint:disable-next-line:no-unused-expression
                data.getQuranSectionsByNo.sections && data.getQuranSectionsByNo.sections.forEach((e) => {
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
    isPlayControl() {
        this.isPlayShow = false;
    }
    ngOnDestroy() {
        // tslint:disable-next-line:no-unused-expression
        this.currentPlay && this.currentPlay.pause();
        // tslint:disable-next-line:no-unused-expression
        this.querySubscription && this.querySubscription.unsubscribe();
    }
}
