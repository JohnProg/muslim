import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { fromUrl, ImageSource } from "image-source";
import { Feedback } from "nativescript-feedback";
import * as SocialShare from "nativescript-social-share";
import { Color } from "tns-core-modules/color";
import { LocalStorage } from "~/shared/utils.localstorage";
import {
    getAllahNameProfile, getHomePageChapterSection,
    getInspireProfile, getSaying
} from "../../shared/api";
import { KoranService } from "../koarn.services";
@Component({
    selector: "Toaday",
    moduleId: module.id,
    templateUrl: "./toaday.component.html",
    styleUrls: ["./toaday.component.css"]
})
export class ToadayComponent implements OnInit {
    getInspire: any;
    getAllahName: any;
    getHotQuranSections: any;
    arabicContents: any;
    chapter: any;
    no: any;
    feedback: Feedback;
    login: string = "IS_LOGIN";
    imageUrl: any;
    title: string;
    getSaying: any;
    img: ImageSource;
    arabicContent: string;
    images: Array<any> = [];
    loginStaues: any;
    querySubscription: Subscription;
    ahImage: any;
    // imageAlUrl = "https://cdn.pixabay.com/photo/2018/01/12/10/19/fantasy-3077928_960_720.jpg";
    imageAlUrl = "~/assets/pic_99names.png";

    constructor(
        private apollo: Apollo,
        private koranService: KoranService,
        private router: Router
    ) {
        this.img = new ImageSource();
        this.feedback = new Feedback();
    }
    ngOnInit() {
        this.ahImage = `url(${this.imageAlUrl}) no-repeat 100% 100%`;
        this.loginStaues = LocalStorage.getObject(this.login);
        this.router.events
            .subscribe((event) => {
                const isMore = LocalStorage.getObject("IS_MORE");
                if (isMore) {
                    this.onTap();
                }
            });
        this.getData();
    }
    getData() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getInspireProfile
        }).valueChanges.subscribe(({ data }) => {

            if (data && data.getInspire) {
                const datas = data.getInspire;
                const code = datas.code;
                if (code === 404) {
                    //
                } else if (code === 200) {
                    this.getInspire = datas;
                }
            }

        });

        this.querySubscription = this.apollo.watchQuery<any>({
            query: getAllahNameProfile,
            variables: {
                id: 2
            }
        }).valueChanges.subscribe(({ data }) => {
            const datas = data.getAllahName;
            const code = datas.code;
            if (code === 200) {
                this.getAllahName = datas.allahName;
                this.ahImage = `url(${this.imageAlUrl})`;
            }
        });

        this.querySubscription = this.apollo.watchQuery<any>({
            query: getHomePageChapterSection,
            variables: {
                id: 1
            }
        }).valueChanges.subscribe(({ data }) => {
            const datas = data.getHomePageChapterSection;
            const code = datas.code;
            if (code === 200) {
                const homePageChapterSection = datas.homePageChapterSection;
                this.title = homePageChapterSection.title;
                this.no = homePageChapterSection.chapterNo + "：" + homePageChapterSection.sectionNos[0];
                this.chapter = homePageChapterSection.chapter;
                const sections = homePageChapterSection.sections;
                if (sections && sections.length > 0) {
                    for (const key in sections) {
                        if (this.arabicContents) {
                            this.arabicContents += sections[key].arabicContent;
                        } else {
                            this.arabicContents = sections[key].arabicContent;
                        }
                    }
                }
            }
        });

        this.querySubscription = this.apollo.watchQuery<any>({
            query: getSaying,
            variables: {
                id: 1
            }
        }).valueChanges.subscribe(({ data }) => {
            const datas = data.getSaying;
            const code = datas.code;
            if (code === 200) {
                this.getSaying = datas.saying;
            }
        });
    }
    shareImage(image) {
        if (this.loginStaues) {
            const imageFile = fromUrl(image).then((res) => {
                SocialShare.shareImage(res);
            });
        } else {
            this.feedback.show({
                title: "Message!",
                titleColor: new Color("#222222"),
                message: "Please Login!",
                messageColor: new Color("#333333"),
                duration: 2000,
                backgroundColor: new Color("#ffc107")
            });
        }
    }
    sendAllAhImage(text: string) {
        if (this.loginStaues) {
            const imageFile = fromUrl(this.imageAlUrl).then((res) => {
                SocialShare.shareImage(res);
            });
            // SocialShare.shareText(text);
        } else {
            this.feedback.show({
                title: "Message!",
                titleColor: new Color("#222222"),
                message: "Please Login!",
                messageColor: new Color("#333333"),
                duration: 2000,
                backgroundColor: new Color("#ffc107")
            });
        }
    }
    onTap() {
        LocalStorage.remove("IS_MORE");
        this.koranService.sendMessage(2);
    }
    shareApp() {
        if (this.loginStaues) {
            SocialShare.shareUrl("https://www.nativescript.org/", "Home of NativeScript");
        } else {
            this.feedback.show({
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
