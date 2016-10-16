import { Routes } from "@angular/router";
import { RunsOverviewComponent } from "./runs-overview/runs-overview.component";
import { AdminRunsComponent } from "./admin-runs/admin-runs.component";
import { LandingComponent } from "./landing/landing.component";

export const appRoutes: Routes = [
    { path: '', component: LandingComponent },
    { path: 'run/:id', component: RunsOverviewComponent },
    { path: 'admin/runs', component: AdminRunsComponent },
    { path: ':emailAddress', component: RunsOverviewComponent }
];
