import { Component } from '@angular/core';
import { RunsService } from "./services/runs.service";
import { AuthService } from "./services/auth.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['app.component.less']
})
export class AppComponent {

    private runs$ = this.runsService.runs$;
    private auth$ = this.authService.auth$;

    constructor (private runsService:RunsService, private authService:AuthService) {

    }

    login () {
        this.authService.doLogin();
    }
}
