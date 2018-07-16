
// tslint:disable-next-line:import-spacing
import { ModuleWithProviders }  from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login.component";
const routing: Routes = [
  { path: "", component: LoginComponent , data: { title: "Sign up" } }
];
// tslint:disable-next-line:variable-name
export const LoginRouting: ModuleWithProviders = RouterModule.forChild(routing);
