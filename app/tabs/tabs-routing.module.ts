import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HlcComponent } from "../hlc/hlc.component";
import { KaabaComponent } from "./kaaba/kaaba.component";
import { KoranhomeComponent } from "./koran/koranhome/koranhome.component";
import { KoranreadComponent } from "./koran/koranread/koranread.component.";
import { KoransecondarypageComponent } from "./koran/koransecondarypage/koransecondarypage.component";
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
// tslint:disable-next-line:ordered-imports
import { WalletComponent } from "../wallet/wallet.component";
const routes: Routes = [
    { path: "", component: TabsComponent, data: { title: "Tabs" } },
    { path: "more", component: MoreComponent, data: { title: "More" } },
    { path: "pray", component: PrayComponent, data: { title: "Pary" } },
    { path: "popular", component: PopularComponent, data: { title: "Populai Suras&Verses" } },
    { path: "hajj", component: HajjComponent, data: { title: "Hajj&Umrch" } },
    { path: "umrch/:id", component: DetailsComponent, data: { title: "Hajj&Umrch" } },
    { path: "inspiration", component: InspirationComponent, data: { title: "Daily Inspiration" } },
    { path: "names", component: NamesComponent, data: { title: "99 Names" } },
    { path: "nearby", component: NearbyComponent, data: { title: "Nearby mosque" } },
    { path: "calender", component: CalenderComponent, data: { title: "Calender" } },
    { path: "koransecondarypage/:id", component: KoransecondarypageComponent },
    { path: "koranread/:id", component: KoranreadComponent },
    { path: "times", component: TimeComponent, data: { title: "Friday 23-3-2018" } },
    { path: "kaaba", component: KaabaComponent, data: { title: "Friday 23-3-2018" } },
    { path: "koranhome", component: KoranhomeComponent, data: { title: "" } },
    { path: "ramadan", component: RamadanComponent, data: { title: "" } },
    {
        path: "hlc", component: HlcComponent,
        data: { title: "HLC CANDY" }
    },
    {
        path: "wallet", component: WalletComponent,
        data: { title: "Wallet" }
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class TabsRoutingModule { }
