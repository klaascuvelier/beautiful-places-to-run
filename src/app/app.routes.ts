import { Routes } from "@angular/router";
import { AdminRunsComponent } from "./admin-runs/admin-runs.component";
import { LandingComponent } from "./landing/landing.component";
import { PlacesComponent } from "./places/places.component";

export const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'admin/runs', component: AdminRunsComponent },
    { path: 'places', component: PlacesComponent },
    { path: 'places/:location', component: PlacesComponent },
    { path: 'runner/:emailAddress', component: PlacesComponent },
    { path: 'runner/:emailAddress/:location', component: PlacesComponent },
];
