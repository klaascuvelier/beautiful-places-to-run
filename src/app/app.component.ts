import { Component } from '@angular/core';
import { RunsService } from "./services/runs.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

    private runs$ = this.runsService.runs$;

    constructor (private runsService:RunsService) {

    }
}
