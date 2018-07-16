import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { LocalStorage } from "~/shared/utils.localstorage";
import { KoranService } from "../../koarn.services";
@Component({
    selector: "More",
    moduleId: module.id,
    templateUrl: "./more.component.html",
    styleUrls: ["./more.component.scss"]
})
export class MoreComponent implements OnInit {
    iconUrl = "";
    items = [];
    constructor(private koranService: KoranService, private re: RouterExtensions) {
        this.iconUrl = "res://icon_";
        this.items = [
            { icon: `${this.iconUrl}times`, text: "times", routerLink: "../times" },
            { icon: `${this.iconUrl}calender`, text: "calender", routerLink: "../calender" },
            { icon: `${this.iconUrl}pray`, text: "pray", routerLink: "../pray" },
            { icon: `${this.iconUrl}qibla`, text: "qibla", routerLink: "../kaaba" },
            { icon: `${this.iconUrl}quran`, text: "quran" },
            { icon: `${this.iconUrl}inspiration`, text: "inspiration", routerLink: "../inspiration" },
            { icon: `${this.iconUrl}ramadan`, text: "ramadan", routerLink: "../ramadan" },
            { icon: `${this.iconUrl}rosay`, text: "rosay", routerLink: "/tasbih" },
            { icon: `${this.iconUrl}99names`, text: "99 names", routerLink: "../names" },
            { icon: `${this.iconUrl}hlccandys`, text: "hlc candy", routerLink: "../hlc" },
            { icon: `${this.iconUrl}popularverses`, text: "popular verses", routerLink: "../popular" },
            { icon: `${this.iconUrl}mosque`, text: "mosque", routerLink: "../nearby" }
        ];
    }
    onTap(item: any) {
        if (item.text === "quran") {
            LocalStorage.setObject("IS_MORE", true);
            this.re.backToPreviousPage();
        }
    }
    ngOnInit(): void {
        //
    }
}
