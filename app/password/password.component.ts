import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackPosition, FeedbackType } from "nativescript-feedback";
import firebase = require("nativescript-plugin-firebase");
import { Color } from "tns-core-modules/color";
@Component({
	selector: "password",
	moduleId: module.id,
	templateUrl: "./password.component.html",
	styleUrls: ["./password.component.css"]
})

export class PasswordComponent implements OnInit {
	feedback: Feedback;
	// tslint:disable-next-line:member-ordering
	email = "1234567890@gamil.com";
	constructor(private routerExtensions: RouterExtensions) {
		this.feedback = new Feedback();
	}

	// tslint:disable-next-line:no-empty
	ngOnInit() {

	}
	upPass() {
		firebase.logout();
		firebase.resetPassword({
			email: this.email
		}).then(
			() => {
				this.feedback.show({
					title: "Message!",
					titleColor: new Color("#222222"),
					message: `请打开您的${this.email}邮箱重置密码！`,
					messageColor: new Color("#333333"),
					duration: 2000,
					backgroundColor: new Color("#ffc107")
				});
				this.routerExtensions.navigate(["/login"], { clearHistory: true });
			},
			(errorMessage) => {
				this.feedback.show({
					title: "Message!",
					titleColor: new Color("#222222"),
					message: "Please check your network!",
					messageColor: new Color("#333333"),
					duration: 2000,
					backgroundColor: new Color("#ffc107")
				});
			}
		);
	}
}
