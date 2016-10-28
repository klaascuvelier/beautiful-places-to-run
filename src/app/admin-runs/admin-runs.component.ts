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

        if ((!item.hasOwnProperty('slug') && item.hasOwnProperty('location'))) {
            data.slug = getSlug(item.location);
        }
        else if (key === 'location') {
            data.slug = getSlug(value);
        }

        this.runs$.update(item.$key, data);

        function getSlug(location:String):String {
            return location
                .trim()
                .replace(/[^\w\s]/, '')
                .replace(/\s/g, '-')
                .toLocaleLowerCase();
        }
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
