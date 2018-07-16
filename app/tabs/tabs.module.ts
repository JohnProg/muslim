import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUICalendarModule } from "nativescript-ui-calendar/angular";
import { KoranReadService } from "~/shared/koranread.services";
import { TitleAndNavButtonModule } from "../directives/title-and-nav-button.module";
import { HlcComponent } from "../hlc/hlc.component";
import { CarouselDirective } from "../shared/nativescript-ng2-carousel";
import { WalletComponent } from "../wallet/wallet.component";
import { KaabaComponent } from "./kaaba/kaaba.component";
import { KoranService } from "./koarn.services";
import { KoranComponent } from "./koran/koran.component";
import { KoranhomeComponent } from "./koran/koranhome/koranhome.component";
import { KoranmoreComponent } from "./koran/koranmore/koranmore.component";
import { KoranreadComponent } from "./koran/koranread/koranread.component.";
import { KoransearchComponent } from "./koran/koransearch/koransearch.component";
import { KoransecondarypageComponent } from "./koran/koransecondarypage/koransecondarypage.component";
import { MineComponent } from "./mine/mine.component";
import { TabsRoutingModule } from "./tabs-routing.module";
import { TabsComponent } from "./tabs.component";
import { TimeComponent } from "./time/time.component";
import { CalenderComponent } from "./toaday/calender/calender.component";
import { DetailsComponent } from "./toaday/hajj/details/details.component";
import { HajjComponent } from "./toaday/hajj/hajj.component";
import { InspirationComponent } from "./toaday/inspiration/inspiration.component";
import { MoreComponent } from "./toaday/more/more.component";
import { NamesComponent } from "./toaday/more/names/names.component";
import { NearbyComponent } from "./toaday/nearby/nearby.component";
import { PopularComponent } from "./toaday/popular/popular.component";
import { PrayComponent } from "./toaday/pray/pray.component";
import { RamadanComponent } from "./toaday/ramadan/ramadan.component";
import { ToadayComponent } from "./toaday/toaday.component";
@NgModule({
    imports: [
        NativeScriptCommonModule,
        TabsRoutingModule,
        NativeScriptUICalendarModule,
        TitleAndNavButtonModule,
        NativeScriptFormsModule
    ],
    declarations: [
        TabsComponent,
        ToadayComponent,
        TimeComponent,
        KoranComponent,
        KaabaComponent,
        MineComponent,
        MoreComponent,
        PrayComponent,
        PopularComponent,
        HajjComponent,
        InspirationComponent,
        DetailsComponent,
        NamesComponent,
        NearbyComponent,
        CalenderComponent,
        KoranreadComponent,
        RamadanComponent,
        KoranhomeComponent,
        KoransecondarypageComponent,
        KoranmoreComponent,
        KoransearchComponent,
        CarouselDirective,
        HlcComponent,
        WalletComponent
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ],
    providers: [
        KoranService,
        KoranReadService
    ]
})
export class TabsModule { }
