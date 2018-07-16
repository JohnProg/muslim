import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo, QueryRef } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { getHotQuranChaptersProfile } from "../../../shared/api";

@Component({
    selector: "popular",
    moduleId: module.id,
    templateUrl: "./popular.component.html",
    styleUrls: ["./popular.component.css"]
})

export class PopularComponent implements OnInit, OnDestroy {

    // countries: Array<{ name: string,  routerLink: string }> = [
    //     { name: "sura AI-Faatiha", routerLink: "" },
    //     { name: "Sura AI-Kahf", routerLink: "" },
    //     { name: "Sura Yaseen", routerLink: "" },
    //     { name: "Sura Ar-Rahmaan", routerLink: "" },
    //     { name: "Sura AI-Waaqia", routerLink: "" },
    //     { name: "Sura AI-Mulk", routerLink: "" }
    // ];

    chapters: any;
    querySubscription: Subscription;

    constructor(
        private apollo: Apollo
    ) { }

    ngOnInit() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getHotQuranChaptersProfile
        }).valueChanges.subscribe(({ data }) => {
            const datas = data.getHotQuranChapters;
            const code = datas.code;
            if (code === 200) {
                this.chapters = datas.chapters;
            }
        });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }

}
