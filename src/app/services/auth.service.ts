import { Injectable } from '@angular/core';
import { AngularFire, AngularFireAuth, AuthProviders, AuthMethods } from "angularfire2";

@Injectable()
export class AuthService {

    public auth$: AngularFireAuth = this.af.auth;


    constructor(private af: AngularFire) {
    }

    doLogin () {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }

}
