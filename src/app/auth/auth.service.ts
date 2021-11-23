import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/Operators'
import { Observable, BehaviorSubject, of, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';

import { LoginFormData, SignUpFormData, LoginResponse, AccountDetailsResponse } from '../helpers/types';
import * as API from '../helpers/apis';
import { User } from '../helpers/modals';
import { AutoLogoutModalComponent } from './auto-logout-modal/auto-logout-modal.component';
import { Router } from '@angular/router';


const AUTH_KEY = 'ak';
const REFRESH_AT = 'ra';
const REFRESH_TOKEN = 'rt';

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

    private logoutSubject = new Subject()
    /** when you count timer data can be emitted using this subject it start with 00:00 */
    private sessionTimeSubject = new BehaviorSubject<string>('00:00');

    // For holding Unix time stamp value
    private refreshAt = 0;
    // To count down timer
    private interval: ReturnType<typeof setInterval> | null = null;

    // It for state managment
    private authToken: string | null = null;
    private refreshToken: string | null = null;

    // Covert subject as Observable
    logout$ = this.logoutSubject.asObservable();
    sessionTime$ = this.sessionTimeSubject.asObservable();

    constructor(
        private http: HttpClient,
        private cookieService: CookieService,
        private matDialog: MatDialog,
        private router: Router,
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
                // const expiryTime = Date.now() + (24 * 60 * 60 * 1000);

                // this.cookieService.set(AUTH_KEY, res.token, {
                // path: '/',
                // expires: new Date(expiryTime),
                // });

                // 60 sec
                // Obtained from backend
                const refreshDuration = 10 * 1000;
                this.refreshToken = this.getRefreshToken();
                this.setAutoLogoutTime(refreshDuration);
                this.setAuthKey(res.token);
            }),
        );
    }

    signup(data: SignUpFormData) {
        return this.http.post(API.SIGNUP, data)
        .pipe(
            map(res => {
                return {
                    success: true,
                    data: res,
                    error: null,
                };
            }),
            catchError(err => {
                return of({
                    success: false,
                    data: null,
                    error: err.error.errors,
                })
            })
        );
    }

    getAuthToken() {
        return this.cookieService.get(AUTH_KEY);
    }

    checkAuthValidity() {
        return this.http.get<{ auth: boolean }>(API.AUTH_CHECK);
    }

    /**
     * Checking the username is used
     */
     checkUsernameAvailability(username: string) {
        const params = new HttpParams().appendAll({
          username
        });
    
        return this.http
          .get<{ available: boolean; }>(API.USERNAME_AVAILABLITY, { params });
    }


    /**
     * API calls for fetch details of user that log in
     */

    getAccountDetails() {
        return this.http.get<AccountDetailsResponse>(API.GET_ACCOUNT_DETAILS)
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

    logout() {
        // return this.cookieService.delete(AUTH_KEY);
        this.cookieService.delete(AUTH_KEY);
        this.cookieService.delete(REFRESH_AT);
        this.cookieService.delete(REFRESH_TOKEN);
        this.authToken = null;
        this.router.navigateByUrl('/login');
        this.subject.next(null);
        this.stopAutoLogoutTimer();
    }

    /**
     * To generate random refresh token we need to create 
     * function. in real prjct you will get fro backend;
     */

    private getRefreshToken() {
        return Math.floor(Math.random() * 6) + 'qwertasddsgfjsdfjhk'
    }

    /**
     * To set autologout time
     * @param {number} durationInMs 
     * @returns 
     */
    private setAutoLogoutTime(durationInMs: number) {
        if (durationInMs <= 0) {
            // If it is invalid duration do nothing
            return;
        }

        const currentTime = Date.now();
        // Adding duration to current time ms
        this.refreshAt = currentTime + durationInMs;
        this.startAutoLogoutTimer();

    }

    private startAutoLogoutTimer() {
        // Make sure no auto logout timer is active other wise occur m/m loss
        this.stopAutoLogoutTimer();

        // To calculate time left in ms
        const timeLeftInMilliseconds = this.refreshAt - Date.now();

        if (timeLeftInMilliseconds < 0) {
            return;
        }

        // Convert milliseconds to sec
        let timeLeftInSec = timeLeftInMilliseconds / 1000;

        // To broadcast remaining time after formatting
        this.sessionTimeSubject.next(this.getFormattedTime(timeLeftInSec));

        // Create an interval to start counter
        this.interval = setInterval(() => {
            if (Date.now() > this.refreshAt) {
                // show the modal when the count down finishes
                this.refreshModal();
                return;
            }

            timeLeftInSec -= 1;

            // To broadcast remaining time after formatting
            this.sessionTimeSubject.next(this.getFormattedTime(timeLeftInSec));

        }, 1000);
    }

    // Function to stop auto logout timer
    private stopAutoLogoutTimer() {
        if (this.interval) {
            clearInterval(this.interval);
        }

        this.interval = null;

        // To broadcast last count down state
        this.sessionTimeSubject.next('00:00');
    }


    /**
     * private function to get formatted time (MM:SS)
     * @param {number} totalDurationInSec 
     * @returns {string}
     */
    private getFormattedTime(totalDurationInSec: number): string {
        if (totalDurationInSec <= 0) {
            return '00:00';
        }

        const minutes = Math.floor(totalDurationInSec / 60);
        const seconds = Math.floor(totalDurationInSec % 60);

        const minitesToDisplay = (minutes < 10)
        ? ('0' + minutes) //prepend 0 if the minite is between 0 to 9
        : minutes.toString();

        const secondsToDisplay = (seconds < 10)
        ? ('0' + seconds) //prepend 0 if the minite is between 0 to 9
        : seconds.toString();
        return `${minitesToDisplay} : ${secondsToDisplay}`;
    }


    /**
     * to show token refresh modal
     */
    private refreshModal() {
        this.matDialog.open(AutoLogoutModalComponent);
        this.stopAutoLogoutTimer();
    }

    refreshAuthKey() {
        // API to refresh auth key
        return of(null)
        .pipe(
            tap(_ => {
                 // New expiry duration obtained from backend.
                const newRefreshDuration = 10 * 1000;
                this.refreshToken = this.getRefreshToken();
                this.setAutoLogoutTime(newRefreshDuration);
                this.setAuthKey(this.authToken!)

            }),
        );
    }


    /**
    * Method to check if there is any session time left
    * on page reload.
    */
     checkForSessionTime() {
        if (this.refreshAt === 0) {
            const refreshTime = this.cookieService.get(REFRESH_AT);
            this.refreshToken = this.cookieService.get(REFRESH_TOKEN);

            if (refreshTime && this.refreshToken) {
                this.refreshToken = this.getAuthToken();
                this.setAutoLogoutTime(+refreshTime - Date.now());
            }
        }
    }

    /**
     * Private function to set the auth key in the storage.
     * @param {string} key 
     */
    private setAuthKey(key: string) {
        this.authToken = key;
        const expiryTime = new Date(this.refreshAt);

        // set authKey in storage
        this.cookieService.set(AUTH_KEY, key, {
            path: '/',
            expires: expiryTime,
        });

        // Set remaining time in the storage
        this.cookieService.set(REFRESH_AT, this.refreshAt.toString(), {
            path: '/',
            expires: expiryTime,
        });
      
        // Set the refresh token in the storage.
        this.cookieService.set(REFRESH_TOKEN, this.refreshToken!, {
        path: '/',
        expires: expiryTime
        });
    }

}