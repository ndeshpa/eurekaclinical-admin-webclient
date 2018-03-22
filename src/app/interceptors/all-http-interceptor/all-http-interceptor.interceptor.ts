import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class AllHttpInterceptor implements HttpInterceptor {
    constructor( private router: Router) { }
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        //console.log( 'Inside Interceptor:' + request.url );
        return next.handle( request )
            .do( event => {
                //console.log( 'INTERCEPTOR EVENT:' + event );
                if ( event instanceof HttpResponse ) {
                    this.router.navigate['/adminview'];
                }
            }, err => {
                console.log( 'Caught error', err.url );
                if ( err.url.indexOf( 'adminview' ) >= 0 ||
                        err.url.indexOf( 'editUser' ) >= 0) {
                    this.router.navigate( ['/adminview'] );
                }
                else if (err.url.indexOf( 'useragreement' ) >= 0){
                    this.router.navigate( ['/useragreement'] );                   
                }
                else{
                    this.router.navigate( ['/welcome']); 
                }
            } );
    }
}
