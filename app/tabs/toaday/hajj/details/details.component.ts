import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { getHajjUmrchProfile } from "../../../../shared/api";

@Component({
    selector: "details",
    moduleId: module.id,
    templateUrl: "./details.component.html",
    styleUrls: ["./details.component.css"]
})

export class DetailsComponent implements OnInit, OnDestroy {

    hajjUmrch: any;
    // title = "Be sure you are ready to perform the Haj";
    // tslint:disable-next-line:max-line-length
    // content = "			The Haj is not to be undertaken lightly or as anafterthought.In ancient times,it was not uncommon forpilgrims to die during theirjourney to Mecca.Thoughmodern conveniences now allow millions of Muslims toquickly and safely travel to and from the holy city,theHajj should still be approached with the seriousnessand dedication of these early pilgrims.Study the ritualsof the Hajj,begin to clear your mind of worldlydistractions,and,most importantly,be repentant forpast sins,which will be forgiven during your pilgrimage.As with all forms of Muslim worship,the Hajj must beundertaken with sincerity and out of a devotion to God(Allah).The Haj cannot be performed for the purpose ofgaining worldly recognition or material gains in this life.The Hajmust be performed in accordance with theprophet Muhammad's words and deeds as described inthe Sunnah.";
    private querySubscription: Subscription;

    constructor(
        private apollo: Apollo,
        public router: Router,
        public activeRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.activeRoute.params.subscribe(
            (params) => {
                const id = params.id;
                this.querySubscription = this.apollo.watchQuery<any>({
                    query: getHajjUmrchProfile,
                    variables: {
                        id
                    }
                }).valueChanges.subscribe(({ data }) => {
                    this.hajjUmrch = data.getHajjUmrch.hajjUmrch;
                });
            }
        );
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }
}
