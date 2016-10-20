import { Injectable } from "@angular/core";
import { AngularFire } from "angularfire2";
import { Observable } from "rxjs";
import { FirebaseListFactoryOpts } from "angularfire2/interfaces";

@Injectable()
export class UsersService {

    constructor(private af: AngularFire) {
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
     * Get the completed runs for the specified email address
     * @param {string} emailAddress
     * @returns {Observable<any>}
     */
    getUsageDataForUser (emailAddress:string):Observable<any> {
        return this
            .emailToUserId(emailAddress)
            .flatMap(userId => {
                console.log('YOLO', userId);
                 if (userId === null) {
                     return Observable.of([]);
                 }
                 else {
                     return this.af.database.object(`/users/${userId}/completed`);
                 }
             });
    }
}