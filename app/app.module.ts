import { NgModule, NgModuleFactoryLoader, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import * as platform from "platform";
import { TitleAndNavButtonModule } from "~/directives/title-and-nav-button.module";
import { AboutComponent } from "./about/about.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginModule } from "./login/login.module";
import { PasswordModule } from "./password/password.module";
import { RegisterModule } from "./register/register.module";
import { GraphQLModule } from "./shared/graphql.module";
import { LoadingService } from "./shared/loading.service";
import { TasbihModule } from "./tasbih/tasbih.module";
declare var GMSServices: any;
if (platform.isIOS) {
    GMSServices.provideAPIKey("AIzaSyAtRVvG3Be3xXiZFR7xp-K-9hy4nZ4hMFs");
}

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        LoginModule,
        RegisterModule,
        PasswordModule,
        TasbihModule,
        GraphQLModule,
        TitleAndNavButtonModule
    ],
    declarations: [
        AboutComponent,
        AppComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        LoadingService
    ]
})
export class AppModule { }
