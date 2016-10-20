import { Injectable } from "@angular/core";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";
import { Auth } from "../types/auth.type";

@Injectable()
export class UsersService {

    constructor(private af: AngularFire) {
    }

    storeUser (user:Auth) {
        const subscription = this
            .getUserByEmail(user.emailAddress)
            .subscribe(data => {
                if (data === null) {
                    const userInfo = {
                        completed: [],
                        emailAddress: user.emailAddress,
                        displayName: user.displayName,
                        avatar: user.avatar,
                        uid: user.uid,
                        isAdmin: false
                    };

                    this.af.database.object(`/users/${user.uid}`).set(userInfo);
                }
                else {
                    subscription.unsubscribe();
                }
            })
    }

    /**
     * Map an email address to it's user id, if any
     * @param {string} emailAddress
     * @returns {Observable<string|null>}
     */
    emailToUserId (emailAddress:string):Observable<string|null> {
        const query = {
            orderByChild: 'emailAddress',
            equalTo: emailAddress
        };

        const options:FirebaseListFactoryOpts = { query };

        return this.af.database.list('/users', options)
             .take(1)
             .map(data => data.length === 1 ? data[0].$key : null);
    }

    /**
     * Get user info by email address
     * @param {string} emailAddress
     * @returns {Observable<any>}
     */
    getUserByEmail (emailAddress:string):Observable<any> {
        return this
            .emailToUserId(emailAddress)
            .flatMap(userId => {
                if (userId === null) {
                    return Observable.of(null);
                }
                else {
                    return this.af.database.object(`/users/${userId}`);
                }
            });
    }
}