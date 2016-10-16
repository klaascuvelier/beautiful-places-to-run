import { Component, OnInit, Input } from '@angular/core';
import { Run } from "../types/run.type";
import { Observable } from "rxjs";
import { RunsService } from "../services/runs.service";

@Component({
    selector: 'app-places',
    templateUrl: 'places.component.html',
    styleUrls: ['places.component.less']
})
export class PlacesComponent implements OnInit {

    private runs$ = this.runsService.runs$;
    private ready:Boolean = false;

    constructor(private runsService: RunsService) {
        //http://www.clker.com/cliparts/b/9/a/0/13510206891495378645Check%20Mark.svg.med.png
    }

    ngOnInit() {}

}
