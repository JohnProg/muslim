import { Component, OnInit } from "@angular/core";

@Component({
selector: "about",
moduleId: module.id,
templateUrl: "./about.component.html",
styleUrls: ["./about.component.css"]
})

export class AboutComponent implements OnInit {

countries: Array<{ name: string, imageSrc: string }> = [
                { name: "facebook.com/bubaiex", imageSrc: "res://icon_facebook"},
                { name: "twitter.com/bubaiex", imageSrc: "res://icon_twitter"},
                { name: "www.dubaiex.com", imageSrc: "res://icon_internet"}
];
legalInfo = [ "Terms&Conditions", "Privacy Policy", "Acknowledgements"];
// tslint:disable-next-line:no-empty
constructor() { }

// tslint:disable-next-line:no-empty
ngOnInit() { }
}
