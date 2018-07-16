
// tslint:disable-next-line:import-spacing
import { ModuleWithProviders }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { PasswordComponent } from "./password.component";

const routes: Routes = [
  { path: "", component: PasswordComponent, data: { title: "Recover password" }}
];
// tslint:disable-next-line:variable-name
export const PasswordRoutes: ModuleWithProviders = RouterModule.forChild(routes);
