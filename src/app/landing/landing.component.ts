import { Component } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Auth } from "../types/auth.type";
import { Observable } from "rxjs";

@Component({
    selector: 'app-landing',
    templateUrl: './landing.component.html',
    styleUrls: [ './landing.component.less' ]
})
export class LandingComponent {

    auth$:Observable<Auth> = this.authService.auth$;

    constructor (private authService: AuthService) {
    }

    login () {
        this.authService.doLogin();
    }
}