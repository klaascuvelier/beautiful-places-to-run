import { RunsOverviewComponent } from "./runs-overview/runs-overview.component";
import { Routes } from "@angular/router";
import { AdminRunsComponent } from "./admin-runs/admin-runs.component";

export const appRoutes: Routes = [
    { path: '', component: RunsOverviewComponent },
    { path: 'run/:id', component: RunsOverviewComponent },
    { path: 'admin/runs', component: AdminRunsComponent }
];
