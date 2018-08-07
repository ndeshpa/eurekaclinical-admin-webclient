import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class AllHttpInterceptor implements HttpInterceptor {
    constructor( private router: Router ) { }
    intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
        return next.handle( request )
            .do(
            event => {
                if ( event instanceof HttpResponse ) {
                    this.router.navigate['/adminview'];
                }
            }, err => {
                if ( err.url ) {
                    if ( err.url.indexOf( 'components' ) >= 0 ||
                        err.url.indexOf( 'adminview' ) >= 0 ||
                        err.url.indexOf( 'editUser' ) >= 0 ) {
                        this.router.navigate( ['/adminview'] );
                    }
                    else if ( err.url.indexOf( 'useragreement' ) >= 0 ) {
                        this.router.navigate( ['/useragreement'] );
                    }
                    else if ( err.url.indexOf( 'createUser' ) >= 0 ) {
                        //this.router.navigate( ['/useragreement'] ); 
                        console.log( err );
                    }
                    else {
                        this.router.navigate( ['/welcome'] );
                    }
                }
                else {
                    this.router.navigate( ['/welcome'] );
                }
            } ).catch( response => {
                if ( response instanceof HttpErrorResponse ) {
                    console.log( 'Processing http error', response );
                }
                return Observable.throw( response );
            } );
    }
}
