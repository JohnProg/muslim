import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { TitleAndNavButtonModule } from "../directives/title-and-nav-button.module";
import { LoginComponent } from "./login.component";
import { LoginRouting } from "./login.routing";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        LoginRouting,
        NativeScriptFormsModule,
        TitleAndNavButtonModule
    ],
    declarations: [
        LoginComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
  })
  export class LoginModule { }
