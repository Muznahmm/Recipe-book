import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/Operators'
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { LoginFormData, SignUpFormData, LoginResponse, AccountDetailsResponse } from '../helpers/types';
import * as API from '../helpers/apis';
import { User } from '../helpers/modals';

const AUTH_KEY = 'auth';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    // private user: User| null= null;
    /**
     * we cannot directly use observable beacuse it is not a good method
     */
    private subject = new BehaviorSubject<User| null>(null)
    /**
     * You can subcribe latest value using user$ now
     * expose observable created by subject
     */
    user$: Observable<User | null> = this.subject.asObservable();

    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {
        this.subject.subscribe
    }

    login(data: LoginFormData) {
    return (this.http
        .post(API.LOGIN, data) as Observable<LoginResponse>)
        .pipe(
        tap(res => {
            // this.user = new User(res.id, res.email, res.username);
            this.subject.next(new User(res.id, res.email, res.username));
            const expiryTime = Date.now() + (24 * 60 * 60 * 1000);

            this.cookieService.set(AUTH_KEY, res.token, {
            path: '/',
            expires: new Date(expiryTime),
            });
        }),
        );
    }

    signup(data: SignUpFormData) {
        return this.http.post(API.SIGNUP, data);
    }

    getAuthToken() {
        return this.cookieService.get(AUTH_KEY);
    }

    checkAuthValidity() {
        return this.http.get<{ auth: boolean }>(API.AUTH_CHECK);
    }

    /**
     * API calls for fetch details of user that log in
     */

    getAccountDetails() {
        return this.http.get<AccountDetailsResponse>(API.GET_AUTH_DETAILS)
        .pipe(
            tap(({id, email, username}) => {
                // this.user = new User(id, email, username)
                this.subject.next(new User(id, email, username));
            }),
        );
    }
    /**
     * to get account information afeter loading we need this api call
     */
    updateUsername(data: { username: string }){
        /**
         * make user as object for that if you not use user as object not refresh your update also
         */
        return this.http.patch<AccountDetailsResponse>(API.UPDATE_USERNAME, data)
        .pipe(
            tap(({id, email, username}) => {
                // this.user = new User(id, email, username)
                this.subject.next(new User(id, email, username));
            })
        );
    }
    /**
     * to get user
     */
    // getUser(){       // not need this any more because we use store pattern as behavior subject
    //     return this.user;
    // }

}