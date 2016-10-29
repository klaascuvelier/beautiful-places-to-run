import { Component, OnDestroy } from '@angular/core';
import { RunsService } from "../services/runs.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { UsersService } from "../services/users.services";
import { Run } from "../types/run.type";
import { combineLatest } from "rxjs/observable/combineLatest";

const emailRegexp:RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


@Component({
    selector: 'app-places',
    templateUrl: 'places.component.html',
    styleUrls: ['places.component.less']
})
export class PlacesComponent implements OnDestroy {

    private auth$ = this.authService.auth$;
    private runs:Array<Run> = [];
    private runner:any = null;

    private ready:Boolean = false;
    private subscriptions:Array<Subscription> = [];

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private runsService: RunsService,
        private usersService: UsersService,
        private router: Router
    ) {
        // Get email from url params
        const urlEmail$ = this.activatedRoute.params.map(params => params['emailAddress'] || null);

        // Get email from logged in user
        const userEmail$ = this.authService.auth$.map(info => info !== null ? info['emailAddress'] : null);

        // Get email from above observables
        const usageEmail$ = combineLatest(urlEmail$, userEmail$).map(data => data[0] !== null ? data[0] : data[1]);

        // Get runner info for email
        const runnerData$ = usageEmail$.flatMap(email => this.getRunnerData(email));

        // Let data come together
        const data = combineLatest(this.runsService.runs$, runnerData$);

        // Wait for runs + runner data
        const dataSubscription = data.subscribe(([runs, runner]) => {
            this.runs = runs;
            this.runner = runner;
            this.ready = true;
        });

        this.subscriptions.push(dataSubscription);
    }

    getRunnerData (email):Observable<any> {
        if (emailRegexp.test(email)) {
            return this.usersService.getUserByEmail(email);
        }
        else {
            return Observable.of(null);
        }
    }

    didRunnerCompleteRun (run:any) {
        const completedRuns = this.runner && this.runner.completedRuns ? this.runner.completedRuns : [];
        return completedRuns.indexOf(run['$key']) > -1;
    }

    login () {
        this.authService.doLogin();
    }

    ngOnDestroy () {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
