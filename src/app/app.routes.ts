import { Routes } from "@angular/router";
import { AdminRunsComponent } from "./admin-runs/admin-runs.component";
import { LandingComponent } from "./landing/landing.component";
import { PlacesComponent } from "./places/places.component";

export const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'places', component: PlacesComponent },
    { path: 'admin/runs', component: AdminRunsComponent },
];
