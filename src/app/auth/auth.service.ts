import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/Operators'
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

import { LoginFormData, SignUpFormData, LoginResponse } from '../helpers/types';
import * as API from '../helpers/apis';

const AUTH_KEY = 'auth';

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    constructor(
        private http: HttpClient,
        private cookieService: CookieService
    ) {}

    login(data: LoginFormData){
        return (this.http.post(API.LOGIN ,data) as Observable<LoginResponse>)
        .pipe(
            tap( res => {
                const expiryTime = Date.now() + (24 * 60 * 60 * 1000);
                this.cookieService.set(AUTH_KEY, res.token, {
                    path: '/',
                    expires: new Date(expiryTime),
                });
                
            })
        )
    }

    signup(data: SignUpFormData) {
        return this.http.post(API.SIGNUP, data);
    }

    getAuthToken() {
        return this.cookieService.get(AUTH_KEY);
    }

}