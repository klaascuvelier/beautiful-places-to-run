import { RunsOverviewComponent } from "./runs-overview/runs-overview.component";
import { Routes } from "@angular/router";

export const appRoutes: Routes = [
    { path: '', component: RunsOverviewComponent },
    { path: 'run/:id', component: RunsOverviewComponent }
];
