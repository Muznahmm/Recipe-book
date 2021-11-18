import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/Operators';



@Injectable({
    providedIn: 'root',
})

export class HttpDelayInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.includes('/api')) {
            
            return of(null)
            .pipe(mergeMap(() => {
              return next.handle(req);
            }))
            .pipe(materialize())
            .pipe(delay(1000))
            .pipe(dematerialize());
        }
    
        return next.handle(req);
    }

}
