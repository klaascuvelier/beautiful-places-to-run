import { Component, HostListener, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { RunsService } from "../services/runs.service";
import { Run } from "../types/run.type";
import { combineLatest } from "rxjs/observable/combineLatest";
import { AuthService } from "../services/auth.service";
import { UsersService } from "../services/users.services";

@Component({
    selector: 'run-detail',
    templateUrl: './run-detail.component.html',
    styleUrls: [ './run-detail.component.less' ]
})
export class RunDetailComponent implements OnInit, OnDestroy {
    private subscriptions:Array<Subscription> = [];
    private run:Run = null;
    private runner:any = null;
    private isLoggedIn:boolean = false;
    private isVisitor:boolean = false;

    constructor (
        private activatedRoute:ActivatedRoute,
        private router:Router,
        private runsService:RunsService,
        private authService:AuthService,
        private usersService:UsersService
    ) {}

    ngOnInit () {

        const runnerEmail = this.activatedRoute.parent.snapshot.params['emailAddress'] || null;
        const routeSubscription = combineLatest(this.runsService.runs$, this.activatedRoute.params)
            .subscribe(([runs, params]) => {
                this.run = runs.filter(run => run.slug === params['location'])[0] || null;
            });

        const dataSubscription = combineLatest(this.authService.auth$, this.usersService.getUserByEmail(runnerEmail))
                .subscribe(([data, runner]) => {
                    if (runner) {
                        this.runner = runner;
                        this.isLoggedIn = data !== null;
                        this.isVisitor = !this.isLoggedIn || this.runner.emailAddress !== data.emailAddress;
                    }
                });

        this.subscriptions.push(routeSubscription);
        this.subscriptions.push(dataSubscription);
    }

    ngOnDestroy () {
        this.subscriptions.forEach(subscription => subscription.unsubscribe());
    }

    didRunnerCompleteRun (run:any) {
        const completedRuns = this.runner && this.runner.completedRuns ? this.runner.completedRuns : [];
        return completedRuns.indexOf(run['$key']) > -1;
    }

    onComplete (completed) {

        if (this.run && this.runner) {
            this.usersService.setRunCompletedForUser(this.run['$key'], this.runner.uid, completed);
        }
    }

    @HostListener('click', ['$event', '$target'])
    close (event) {
        if (event.target.tagName === 'RUN-DETAIL') {
            this.router.navigate(['../'], { relativeTo: this.activatedRoute });
        }
    }
}