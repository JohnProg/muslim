import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TasbihRoutingModule } from "./tasbih-routing.module";
import { TasbihComponent } from "./tasbih.component";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        TasbihRoutingModule
    ],
    declarations: [
        TasbihComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class TasbihModule {}
