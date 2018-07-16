import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { TasbihComponent } from "./tasbih.component";

const routes: Routes = [
    { path: "", component: TasbihComponent, data: { title : "Tasbih" } }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TasbihRoutingModule { }
