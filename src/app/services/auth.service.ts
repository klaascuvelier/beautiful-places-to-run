import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from "angularfire2";
import { ReplaySubject } from 'rxjs';
import { Auth } from '../types/auth.type';

@Injectable()
export class AuthService {

    public auth$: ReplaySubject<Auth> = new ReplaySubject<Auth>(null);

    constructor(private af: AngularFire) {
        this.af.auth
            .subscribe(auth => {
                let user:Auth = null;

                if (auth !== null) {
                    user = {
                        displayName: auth.auth['displayName'],
                        emailAddress: auth.auth['emailAddress'],
                        uid: auth.uid,
                        isAdmin: auth.uid === 'JjWJHzU35XesS0RL1LCxkHTBS8h2'
                    };
                }

                this.auth$.next(user);
            });
    }

    doLogin () {
        this.af.auth.login({
            provider: AuthProviders.Facebook,
            method: AuthMethods.Popup
        });
    }

}
