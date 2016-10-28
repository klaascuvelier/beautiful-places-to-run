import { Component, OnDestroy } from '@angular/core';
import { RunsService } from "../services/runs.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";
import { zip } from "rxjs/observable/zip";
import { Observable, Subscription, Subject } from "rxjs";
import { UsersService } from "../services/users.services";
import { Run } from "../types/run.type";

const emailRegexp:RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


@Component({
    selector: 'app-places',
    templateUrl: 'places.component.html',
    styleUrls: ['places.component.less']
})
export class PlacesComponent implements OnDestroy {

    private runs:Array<Run> = [];
    private runner:any = null;
    private selectedRun:Run = null;

    private ready:Boolean = false;
    private subscription:Subscription = null;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private runsService: RunsService,
        private usersService: UsersService
    ) {
        // Get email from url params
        const urlEmail$ = this.activatedRoute.params.map(params => params['emailAddress'] || null);

        // Get email from logged in user
        const userEmail$ = this.authService.auth$.map(info => info !== null ? info['emailAddress'] : null);

        // Get email from above observables
        const usageEmail$ = zip(urlEmail$, userEmail$).map(data => data[0] !== null ? data[0] : data[1]);

        // Get runner info for email
        const runnerData$ = usageEmail$.flatMap(email => this.getRunnerData(email));

        // Let data come together
        const data = zip(this.runsService.runs$, runnerData$);

        this.subscription = data.subscribe(([runs, runner]) => {
            this.runs = runs;
            this.runner = runner;
            this.ready = true;
        });
    }

    getRunnerData (email):Observable<any> {
        if (emailRegexp.test(email)) {
            return this.usersService.getUserByEmail(email);
        }
        else {
            return Observable.of(null);
        }
    }

    showRunDetails (run) {
        this.selectedRun = run;
    }

    resetRunDetail () {
        this.showRunDetails(null);
    }

    ngOnDestroy () {
        this.subscription.unsubscribe();
    }
}
