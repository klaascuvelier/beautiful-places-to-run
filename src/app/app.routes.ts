import { Routes } from "@angular/router";
import { AdminRunsComponent } from "./admin-runs/admin-runs.component";
import { LandingComponent } from "./landing/landing.component";
import { PlacesComponent } from "./places/places.component";
import { RunDetailComponent } from "./run-detail/run-detail.component";

export const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'admin/runs', component: AdminRunsComponent },
    {
        path: 'places',
        component: PlacesComponent,
        children: [
            { path: '' },
            { path: ':location', component: RunDetailComponent }
        ]
    },
    {
        path: 'runner/:emailAddress',
        component: PlacesComponent,
        children: [
            { path: '' },
            { path: ':location', component: RunDetailComponent }
        ]
    }
];
