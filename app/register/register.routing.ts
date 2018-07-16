
// tslint:disable-next-line:import-spacing
import { ModuleWithProviders }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { RegisterComponent } from "./register.component";

const routes: Routes = [
  { path: "", component: RegisterComponent, data: { title: "Register" } }
];
// tslint:disable-next-line:variable-name
export const RegisterRoutes: ModuleWithProviders = RouterModule.forChild(routes);
