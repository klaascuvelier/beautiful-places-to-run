import { Component, OnInit, Input } from '@angular/core';
import { Run } from "../types/run.type";
import { Observable } from "rxjs";
import { RunsService } from "../services/runs.service";

@Component({
    selector: 'app-runs-overview',
    templateUrl: './runs-overview.component.html',
    styleUrls: ['runs-overview.component.less']
})
export class RunsOverviewComponent implements OnInit {

    private runs$ = this.runsService.runs$;

    constructor(private runsService: RunsService) {
    }

    ngOnInit() {}

}
