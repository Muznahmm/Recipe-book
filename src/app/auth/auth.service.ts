import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface LoginFormData {
    username: string,
    password: string,
}

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

}