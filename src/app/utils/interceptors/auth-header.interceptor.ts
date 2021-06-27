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
        const { url, headers } = req;
        
        if(this.shouldIntercept(url)){ 
            //other than signup and login
            req = req.clone({
                headers: this.getHeadersToAdd(headers)
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

    /**
   * Private method to get the headers to add to the request.
   * @param currentHeaders 
   * @returns {HttpHeaders}
   */
    private getHeadersToAdd(currentHeader: HttpHeaders): HttpHeaders {
        const token = this.authService.getAuthToken();
        //Tuple Array that contain all headers to be added to the request
        const headersToAdd: [string, string][] = [
            ['Authorization', `Bearer ${token}`]
        ];

        //I// Ignore if the request already has the 'Content-Type' header.other wise push.
        if(!currentHeader.has('content-Type')) {
            headersToAdd.push(['Content-Type','application/json']);
        }

        let newHeader = currentHeader;

        for(const headerToAdd of headersToAdd) {
            newHeader = newHeader.append(...headerToAdd)
        }
        
        return newHeader;
    }
}