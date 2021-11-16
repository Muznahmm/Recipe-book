import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/Operators';

import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class CorePageGuard implements CanActivate{
    
    constructor(
        private authService: AuthService,
        private router: Router,
    ) {}
    canActivate( 
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
    ): Observable<boolean> {
        
        return this.authService.checkAuthValidity()
        .pipe(
            map(res => {
                if(res.auth){
                    return true;
                }
                this.router.navigateByUrl('/login');
                return false;
            }),
            catchError(_ => {
                this.router.navigateByUrl('/login');
                return of(false);
            })
        );
    }

}