import { HttpHandler, HttpInterceptor, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import { LOGIN, SIGNUP } from 'src/app/helpers/apis';

const EXEMPTIONS = [
    LOGIN,
    SIGNUP
]
@Injectable()

export class AuthHeaderInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthService,
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable <HttpEvent<any>> {
        const { url } = req;
        const token = this.authService.getAuthToken();
        if(this.shouldIntercept(url)){ 
            //other than signup and login
            req = req.clone({
                headers: new HttpHeaders({
                    contentType: 'application/json',
                    Authorization: `Bearer ${token}`
                })
            })
        }
        return next.handle(req);
    }
    //We don't need accesstoken for signup and login
    private shouldIntercept(url: string) {
        for( let exemption of EXEMPTIONS) {
            if (url.endsWith(exemption)) {
                return false;
            }
        }
        return true;
    }
}