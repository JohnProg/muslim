import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { SetupItemViewArgs } from "nativescript-angular/directives";
import { getAllahNamesProfile } from "../../../../shared/api";

@Component({
    selector: "names",
    moduleId: module.id,
    templateUrl: "./names.component.html",
    styleUrls: ["./names.component.css"]
})
export class NamesComponent implements OnInit, OnDestroy {

    getAllahNames: any;
    counter = 1;
    myItems: Array<object> = [];
    private querySubscription: Subscription;
    constructor(
        private apollo: Apollo
    ) {
        this.getData();
    }

    ngOnInit() {
        //
    }

    loadMoreItems() {
        this.getData();
    }

    getData() {
        this.querySubscription = this.apollo.watchQuery<any>({
            query: getAllahNamesProfile,
            variables: {
                pageNumber: this.counter,
                pageSize: 10
            }
        }).valueChanges.subscribe(({ data }) => {
            this.getAllahNames = data.getAllahNames.allahNames;
            this.counter += 1;
            if (this.getAllahNames.length > 0) {
                // tslint:disable-next-line:prefer-conditional-expression
                if (this.myItems.length > 0) {
                    this.myItems = this.myItems.concat(this.getAllahNames);
                } else {
                    this.myItems = this.getAllahNames;
                }
            }
        });
    }

    ngOnDestroy() {
        this.querySubscription.unsubscribe();
    }

}
