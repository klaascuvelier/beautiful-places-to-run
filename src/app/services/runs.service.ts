import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { Run } from '../types/run.type';

@Injectable()
export class RunsService {

    public runs$:FirebaseListObservable<Array<Run>> = this.af.database.list('runs');

    constructor(private af: AngularFire) {}

}
