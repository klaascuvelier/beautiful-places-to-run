import { Injectable } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods } from "angularfire2";
import { ReplaySubject } from 'rxjs';
import { Auth } from '../types/auth.type';
import { UsersService } from "./users.services";

@Injectable()
export class AuthService {

    public auth$: ReplaySubject<Auth> = new ReplaySubject<Auth>(null);

    constructor(private af: AngularFire, private usersService:UsersService) {
        this.af.auth
            .subscribe(auth => {
                let user:Auth = null;

                if (auth !== null) {
                    user = {
                        displayName: auth.auth['displayName'],
                        emailAddress: auth.auth['email'],
                        avatar: auth.auth['photoURL'],
                        uid: auth.uid,
                        isAdmin: auth.uid === 'JjWJHzU35XesS0RL1LCxkHTBS8h2'
                    };

                    this.usersService.storeUser(user);
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
