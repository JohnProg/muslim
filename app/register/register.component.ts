import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback, FeedbackPosition, FeedbackType } from "nativescript-feedback";
import firebase = require("nativescript-plugin-firebase");
import { Color } from "tns-core-modules/color";
import { LocalStorage } from "../shared/utils.localstorage";
@Component({
  selector: "register",
  moduleId: module.id,
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})

export class RegisterComponent implements OnInit {
  email = "1234567890@gamil.com";
  pass = "Zhongming14523145";
  user: string = "REGISTER_USER_INFO";
  name = "Sylvanas";
  describe = "By registering with us you are agree to the Terms and Agreement and our Privacy Policy";
  feedback: Feedback;
  constructor(private routerExtensions: RouterExtensions) {
    this.feedback = new Feedback();
  }
  // tslint:disable-next-line:no-empty
  ngOnInit() { }
  loginByTwitter() {
    //
  }
  loginByGoogle() {
    firebase.login({
      type: firebase.LoginType.GOOGLE,
      googleOptions: {
        hostedDomain: "mygsuitedomain.com"
      }
    }).then(
      // tslint:disable-next-line:only-arrow-functions
      (result) => {
        this.feedback.success({
          title: "Message!",
          message: "Google Login success!",
          duration: 2000
        });
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
      },
      // tslint:disable-next-line:only-arrow-functions
      (errorMessage) => {
        this.feedback.show({
          title: "Message!",
          titleColor: new Color("#222222"),
          message: "Google Login Failed！",
          messageColor: new Color("#333333"),
          duration: 2000,
          backgroundColor: new Color("#ffc107")
        });
      }
    );
  }
  loginByFacebook() {
    firebase.login({
      scope: ["public_profile", "email"],
      // note that you need to enable Facebook auth in your firebase instance
      type: firebase.LoginType.FACEBOOK
    }).then(
      (result) => {
        this.feedback.success({
          title: "Message!",
          message: "Facebook Login success!",
          duration: 2000
        });
        this.routerExtensions.navigate(["/login"], { clearHistory: true });
      },
      (errorMessage) => {
        this.feedback.show({
          title: "Message!",
          titleColor: new Color("#222222"),
          message: "Google Login Failed!",
          messageColor: new Color("#333333"),
          duration: 2000,
          backgroundColor: new Color("#ffc107")
        });
      }
    );
  }
  submit() {
    this.makePostRequest();
  }
  makePostRequest() {
    const uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
    if (uPattern.test(this.name)) {
      const uEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      if (uEmail.test(this.email)) {
        const uPass = /^[\da-zA-Z]{6,18}$/;
        if (uPass.test(this.pass)) {
          firebase.createUser({
            email: this.email,
            password: this.pass
          }).then(
            (result) => {
              LocalStorage.setObject(this.user, { name: this.name, email: this.email, pass: this.pass });
              this.feedback.success({
                title: "Message!",
                message: "Registration success!",
                duration: 2000
              });
              this.routerExtensions.navigate(["/login"], { clearHistory: true });
            },
            (errorMessage) => {
              this.feedback.show({
                title: "Message!",
                titleColor: new Color("#222222"),
                message: "The email address is already in use by another account.",
                messageColor: new Color("#333333"),
                duration: 2000,
                backgroundColor: new Color("#ffc107")
              });
            }
          );
        } else {
          this.feedback.show({
            title: "Message!",
            titleColor: new Color("#222222"),
            message: "请输入最少6位，包括数字字母！",
            messageColor: new Color("#333333"),
            duration: 2000,
            backgroundColor: new Color("#ffc107")
          });
        }
      } else {
        this.feedback.show({
          title: "Message!",
          titleColor: new Color("#222222"),
          message: "请输入正确的邮箱！",
          messageColor: new Color("#333333"),
          duration: 2000,
          backgroundColor: new Color("#ffc107")
        });

        return;
      }
    } else {
      this.feedback.show({
        title: "Message!",
        titleColor: new Color("#222222"),
        message: "请输入6-18位的用户名，包含数字字母下划线",
        messageColor: new Color("#333333"),
        duration: 2000,
        backgroundColor: new Color("#ffc107")
      });

      return;
    }
  }
}
