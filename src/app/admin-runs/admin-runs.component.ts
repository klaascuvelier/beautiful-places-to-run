import { Component, OnInit } from '@angular/core';
import { RunsService } from "../services/runs.service";

@Component({
    selector: 'app-admin-runs',
    templateUrl: './admin-runs.component.html',
    styleUrls: ['admin-runs.component.less']
})
export class AdminRunsComponent implements OnInit {

    private runs$ = this.runsService.runs$;

    constructor(private runsService: RunsService) {

    }

    ngOnInit() {
    }

    update (item, key, value) {

        const data = {};
        data[key] = value;

        this.runs$.update(item.$key, data);
    }

    addRun () {
        this.runs$.push({
            description: '',
            location: '',
            image: '',
            link: ''
        });
    }
}
