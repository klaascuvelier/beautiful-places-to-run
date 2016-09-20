import { Component, OnInit, Input } from '@angular/core';
import { Run } from "../types/run.type";
import { Observable } from "rxjs";

@Component({
    selector: 'app-runs-overview',
    templateUrl: './runs-overview.component.html',
    styleUrls: ['runs-overview.component.less']
})
export class RunsOverviewComponent implements OnInit {

    @Input() runs:Observable<Array<Run>>;

    constructor() {
    }

    ngOnInit() {}

}
