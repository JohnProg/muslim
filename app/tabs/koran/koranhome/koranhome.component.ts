
import { Component, Input, OnInit, Output } from "@angular/core";
@Component({
    selector: "koranhome",
    moduleId: module.id,
    templateUrl: "./koranhome.component.html",
    styleUrls: ["./koranhome.component.css"]
})
export class KoranhomeComponent implements OnInit {
    choose: number = 0;
    @Input() aIndex = -1;
    isDis: any;
    images = [
        { src: "res://icon_catalog" },
        { src: "res://icon_sarch2" },
        { src: "res://icon_koranmore" }
    ];
    constructor() {
        //
    }
    ngOnInit() {
        //
    }
    isChange(index) {
        this.choose = index;
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.choose === 0) {
            this.images[0].src = "res://icon_catalog";
        } else {
            this.images[0].src = "res://icon_catalog1";
        }
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.choose === 1) {
            this.images[1].src = "res://icon_sarch1";
        } else {
            this.images[1].src = "res://icon_sarch2";
        }
        // tslint:disable-next-line:prefer-conditional-expression
        if (this.choose === 2) {
            this.images[2].src = "res://icon_more1";
        } else {
            this.images[2].src = "res://icon_koranmore";
        }
    }
}
