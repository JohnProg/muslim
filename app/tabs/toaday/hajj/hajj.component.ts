import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { getHajjUmrchsProfile } from "../../../shared/api";

@Component({
    selector: "hajj",
    moduleId: module.id,
    templateUrl: "./hajj.component.html",
    styleUrls: ["./hajj.component.css"]
})
export class HajjComponent implements OnInit, OnDestroy {

    hajjUmrchs: any;
    url: any;
    // countries = [
    //     { name: "Preparing", title: "Preparing for the Hajj", routerLink: "../umrch/1" },
    //     { name: "Umrah", title: "Performing the Rite of Umrah", routerLink: "" },
    //     { name: "Hajj", title: "Performing the Rite of Hajj", routerLink: "" }
    // ];
    private querySubscription: Subscription;

    constructor(
        private apollo: Apollo
    ) {}

    ngOnInit() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getHajjUmrchsProfile
        }).valueChanges.subscribe(({ data }) => {
            this.hajjUmrchs = data.getHajjUmrchs.hajjUmrchs;
        });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }

}
