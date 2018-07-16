import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { TitleAndNavButtonModule } from "../directives/title-and-nav-button.module";

import { HttpClientModule } from "@angular/common/http";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { RegisterComponent } from "./register.component";
import { RegisterRoutes } from "./register.routing";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        RegisterRoutes,
        TitleAndNavButtonModule,
        HttpClientModule,
        NativeScriptFormsModule
    ],
    declarations: [
        RegisterComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class RegisterModule { }
