import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginFormData, SignUpFormData } from './auth.types';

@Injectable({
    providedIn: 'root',
})

export class AuthService {

    constructor(
        private http: HttpClient,
    ) {}

    login(data: LoginFormData){
        return this.http.post('/api/accounts/login',data);
    }

    signup(data: SignUpFormData) {
        return this.http.post('/api/accounts/signup', data);
    }

}