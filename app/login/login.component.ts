import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Feedback } from "nativescript-feedback";
import firebase = require("nativescript-plugin-firebase");
import { Color } from "tns-core-modules/color";
import { LocalStorage } from "../shared/utils.localstorage";
@Component({
  selector: "Login",
  moduleId: module.id,
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})

export class LoginComponent implements OnInit {
  email = "1234567890@gamil.com";
  pass = "Zhongming14523145";
  feedback: Feedback;
  token: string = LocalStorage.get("TOKEN");
  login: string = "IS_LOGIN";
  userInfo: any = "LOGIN_USER_INFO";
  constructor(private routerExtensions: RouterExtensions) {
    this.feedback = new Feedback();
  }

  // tslint:disable-next-line:no-empty
  ngOnInit() {

  }
  addUserLogin() {
    const uEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (uEmail.test(this.email)) {
      const uPass = /^[\da-zA-Z]{6,18}$/;
      if (uPass.test(this.pass)) {
        firebase.login(
          {
            type: firebase.LoginType.PASSWORD,
            passwordOptions: {
              email: this.email,
              password: this.pass
            }
          })
          .then((result) => {
            firebase.getAuthToken({
              forceRefresh: false
            }).then(
              (token) => {
                LocalStorage.set(this.token, token);
                LocalStorage.setObject(this.userInfo, { email: this.email, pass: this.pass });
                LocalStorage.setObject(this.login, true);
                this.routerExtensions.navigate(["/tabs"], { clearHistory: true });
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
            this.feedback.success({
              title: "Message!",
              message: "登录成功！",
              duration: 2000
            });
          })
          .catch((error) =>
            this.feedback.show({
              title: "Message!",
              titleColor: new Color("#222222"),
              message: "账号或密码错误,或已被使用！",
              messageColor: new Color("#333333"),
              duration: 2000,
              backgroundColor: new Color("#ffc107")
            }));
      } else {
        this.feedback.show({
          title: "Message!",
          titleColor: new Color("#222222"),
          message: "请输入正确的密码",
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
  }
  OnClickLink() {
    this.routerExtensions.navigate(["/register"]);
  }
  addUserPassword() {
    this.routerExtensions.navigate(["/password"], { clearHistory: true });
  }
}
