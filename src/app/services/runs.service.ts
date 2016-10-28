import { Injectable } from '@angular/core';
import { AngularFire } from "angularfire2";
import { Run } from '../types/run.type';
import { Observable } from "rxjs";

@Injectable()
export class RunsService {

    public runs$:Observable<Array<Run>> = this.af.database
        .list('runs')
        .map(runs => runs.map(run => {
            run.slug = run.location
                .trim()
                .replace(/[^\w\s]/, '')
                .replace(/\s/g, '-')
                .toLocaleLowerCase();
            return run;
        }));

    constructor(private af: AngularFire) {}

}
