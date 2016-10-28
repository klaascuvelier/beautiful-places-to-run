import { Component, OnDestroy } from '@angular/core';
import { RunsService } from "../services/runs.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { zip } from "rxjs/observable/zip";
import { Observable, Subscription, Subject } from "rxjs";
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
    private selectedRun:Run = null;

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
        const usageEmail$ = zip(urlEmail$, userEmail$).map(data => data[0] !== null ? data[0] : data[1]);

        // Get runner info for email
        const runnerData$ = usageEmail$.flatMap(email => this.getRunnerData(email));

        // Let data come together
        const data = zip(this.runsService.runs$, runnerData$);

        // Wait for runs + runner data
        const dataSubscription = data.subscribe(([runs, runner]) => {
            this.runs = runs;
            this.runner = runner;
            this.ready = true;
        });

        // Wait for route data and runs
        const routeSubscription = combineLatest(this.runsService.runs$, this.activatedRoute.params)
            .subscribe(([runs, params]) => {
                if (params.hasOwnProperty('location')) {
                    const run = runs.filter(run => run.slug === params['location'])[0] || null;

                    if (run !== null) {
                        this.showRunDetails(run);
                    }
                }
            });

        this.subscriptions.push(dataSubscription);
        this.subscriptions.push(routeSubscription);
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

        const route = this.activatedRoute.snapshot;

        if (route.params.hasOwnProperty('location')) {
            const newRoute = route.url.slice(0, -1).map(segment => segment.path).join('/');
            this.router.navigateByUrl(`/${newRoute}`);
        }
    }

    login () {
        this.authService.doLogin();
    }

    ngOnDestroy () {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }
}
