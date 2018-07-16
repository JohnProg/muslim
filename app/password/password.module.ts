import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TitleAndNavButtonModule } from "../directives/title-and-nav-button.module";
import { PasswordComponent } from "./password.component";
import { PasswordRoutes } from "./password.routing";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        PasswordRoutes,
        TitleAndNavButtonModule,
        NativeScriptFormsModule
    ],
    declarations: [
        PasswordComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class PasswordModule { }
