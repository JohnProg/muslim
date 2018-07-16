import { Component, OnInit } from "@angular/core";

@Component({
    selector: "Pray",
    moduleId: module.id,
    templateUrl: "./pray.component.html",
    styleUrls: ["./pray.component.scss"]
})
export class PrayComponent implements OnInit {
    iconUrl = "";
    items = [];
    constructor() {
        this.iconUrl = "res://icon_";
        this.items = [
            {icon: `${this.iconUrl}everyscripture`, text: "Evary", routerLink: ""},
            {icon: `${this.iconUrl}morningevening`, text: "AM&PE", routerLink: ""},
            {icon: `${this.iconUrl}homefamily`, text: "Home&Family", routerLink: ""},
            {icon: `${this.iconUrl}fooddrink`, text: "Food&Drink", routerLink: ""},
            {icon: `${this.iconUrl}travel`, text: "Travel", routerLink: ""},
            {icon: `${this.iconUrl}prayer`, text: "Prayer", routerLink: ""},
            {icon: `${this.iconUrl}praisingaiiah`, text: "Praising", routerLink: ""},
            {icon: `${this.iconUrl}goodetiquette`, text: "Good Etiquette", routerLink: ""},
            {icon: `${this.iconUrl}hajjumrah`, text: "Hajj&Umrah", routerLink: "../hajj"},
            {icon: `${this.iconUrl}nature`, text: "Nature", routerLink: ""},
            {icon: `${this.iconUrl}sicknessdeath`, text: "Sickness&Death", routerLink: ""},
            {icon: `${this.iconUrl}joydistress`, text: "Joy&Distress", routerLink: ""}
        ];
    }

    ngOnInit(): void {
        //
    }
}
