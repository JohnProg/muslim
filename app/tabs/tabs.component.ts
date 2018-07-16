import { Component, DoCheck, OnInit, Output } from "@angular/core";
import * as moment from "moment";
import { Feedback } from "nativescript-feedback";
import firebase = require("nativescript-plugin-firebase");
import { Color } from "tns-core-modules/color";
import { SelectedIndexChangedEventData, TabView } from "tns-core-modules/ui/tab-view";
import { Page } from "ui/page";
import { LocalStorage } from "../shared/utils.localstorage";
import { KoranService } from "./koarn.services";
@Component({
    selector: "TabsComponent",
    moduleId: module.id,
    templateUrl: "./tabs.component.html",
    styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit, DoCheck {
    selectIndex: any = 0;
    selIndex: any;
    _title: string;
    feedback: Feedback;
    flag: boolean = false;

    constructor(
        private page: Page,
        private koranService: KoranService) {
        this.feedback = new Feedback();
        this.koranService.subject.subscribe((index) => {
            this.selIndex = index;
        });
    }

    ngOnInit(): void {
        moment.locale("en");
    }
    ngDoCheck() {
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.selectIndex !== 2) {
            this.title = moment().format("dddd D-M-YYYY");
        } else {
            this.title = "";
        }
    }
    get title() {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    onSelectedIndexChanged(args: SelectedIndexChangedEventData) {
        const tabView = <TabView>args.object;
        const selectedTabViewItem = tabView.items[args.newIndex];
        this.selectIndex = args.newIndex;
        this.selIndex = args.newIndex;
    }
}
