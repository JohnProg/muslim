import { Directive, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import * as app from "application";
import { EventData } from "data/observable";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationButton } from "ui/action-bar";
import { Page } from "ui/page";

@Directive({
    selector: "[sdkToggleNavButton]"
})
export class ToggleNavButtonDirective implements OnInit {
    constructor(private route: ActivatedRoute, private page: Page, private routerExtensions: RouterExtensions) {
        const navigationButton = this.createNavigationButton();
        page.actionBar.navigationButton = navigationButton;
    }

    ngOnInit() {
        this.toggleNavigationButtonVisibility(this.page.actionBar.navigationButton);
    }

    createNavigationButton(): NavigationButton {
        const navigationButton = new NavigationButton();
        navigationButton.visibility = "visible";
        if (app.android) {
            navigationButton.icon = "res://icon_return";
            navigationButton.on("tap", (args: EventData) => {
                this.routerExtensions.backToPreviousPage();
            });
        } else if (app.ios) {
             navigationButton.text = "";
        }

        return navigationButton;
    }

    toggleNavigationButtonVisibility(button: NavigationButton) {
        if (button.actionBar.title === "Tabs") {
            button.visibility = "collapsed";
        }
    }
}
