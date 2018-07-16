import { Component, OnDestroy, OnInit } from "@angular/core";
import { Apollo } from "apollo-angular";
import { Subscription } from "apollo-client/util/Observable";
import { Feedback } from "nativescript-feedback";
import { Color } from "tns-core-modules/color";
import { LocalStorage } from "~/shared/utils.localstorage";
import { addHlc, getHlc } from "../shared/api";
@Component({
	selector: "hlc",
	moduleId: module.id,
	templateUrl: "./hlc.component.html",
	styleUrls: ["./hlc.component.css"]
})

export class HlcComponent implements OnInit, OnDestroy {
	addWallet: any;
	time: any;
	randomDisplay: boolean = false;
	login: string = "IS_LOGIN";
	querySubscription: Subscription;
	isDisplay: boolean = false;
	percent: any = "0%";
	feedback: Feedback;
	loginStaues: any;
	constructor(private apollo: Apollo) {
		this.feedback = new Feedback();
	}

	ngOnInit() {
		this.getHlcTime();
	}
	getHlcTime() {
		this.loginStaues = LocalStorage.getObject(this.login);
		if (this.loginStaues) {
			this.randomDisplay = true;
			this.querySubscription = this.apollo.watchQuery<any>({
				query: getHlc
			})
				.valueChanges
				.subscribe(({ data }) => {
					const eventTime = data.getHlc.hlc.expire * 1000;
					this.addWallet = data.getHlc.hlc.random;
					const currentTime = new Date().getTime();
					// tslint:disable-next-line:no-bitwise
					this.percent = ~~(eventTime / currentTime) + "%";
					if (this.percent >= 100) {
						this.isDisplay = true;
						this.percent = 100;
					}
				}, (err) => {
					this.feedback.show({
						title: "Message!",
						titleColor: new Color("#222222"),
						message: "Please check your network!",
						messageColor: new Color("#333333"),
						duration: 2000,
						backgroundColor: new Color("#ffc107")
					});
				});
		} else {
			this.addWallet = "0.0000";
			this.feedback.show({
				title: "Message!",
				titleColor: new Color("#222222"),
				message: "Please Login!",
				messageColor: new Color("#333333"),
				duration: 2000,
				backgroundColor: new Color("#ffc107")
			});
		}
	}
	ngOnDestroy() {
		// tslint:disable-next-line:no-unused-expression
		this.querySubscription && this.querySubscription.unsubscribe();
	}
	onTap() {
		this.apollo.mutate({
			mutation: addHlc
		}).subscribe(({ data }) => {
			this.addWallet = data.addHlcRandom.hlc.random;
			this.getHlcTime();
			this.isDisplay = false;
		}, (error) => {
			this.feedback.show({
				title: "Message!",
				titleColor: new Color("#222222"),
				message: "Please check your network!",
				messageColor: new Color("#333333"),
				duration: 2000,
				backgroundColor: new Color("#ffc107")
			});
		});
	}
}
