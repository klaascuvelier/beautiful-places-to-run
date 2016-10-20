import { Component, OnInit } from '@angular/core';
import { RunsService } from "../services/runs.service";
import { AuthService } from "../services/auth.service";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: 'app-places',
    templateUrl: 'places.component.html',
    styleUrls: ['places.component.less']
})
export class PlacesComponent implements OnInit {

    private runs$ = this.runsService.runs$;
    private user$ = this.runsService.runs$;
    private loggedinUser$ = this.runsService.runs$;
    private ready:Boolean = false;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private runsService: RunsService
    ) {

        this.runs$.subscribe(data => {
            if (data !== null) {
                this.ready = true;
            }
        });

        this.activatedRoute.params.subscribe(params => {
           console.log(params['emailAddress']);
        });



    }

    ngOnInit() {}

}
