import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { AboutComponent } from "./about/about.component";
const routes: Routes = [
    { path: "", redirectTo: "/tabs", pathMatch: "full" },
    { path: "tabs",
      loadChildren: "./tabs/tabs.module#TabsModule",
      data: { title: "Tabs" } },
    { path: "login",
      loadChildren: "./login/login.module#LoginModule",
      data: { title: "Login" } },
    { path: "register", loadChildren: "./register/register.module#RegisterModule",
      data: { title: "Register" } },
    { path: "password", loadChildren: "./password/password.module#PasswordModule",
      data: { title: "Recover password" } },
    { path: "about", component: AboutComponent,
      data: { title: "About us" } },
    { path: "tasbih", loadChildren: "./tasbih/tasbih.module#TasbihModule",
      data: { title: "Using iOS " } }
];

@NgModule({
  imports: [NativeScriptRouterModule.forRoot(routes)],
  exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
