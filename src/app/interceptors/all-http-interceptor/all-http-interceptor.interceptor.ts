import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AllHttpInterceptor implements HttpInterceptor {
  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('Inside Interceptor:' + request.url);
      return next.handle(request)
      .do(event => {
        if (event instanceof HttpResponse) {
            console.log(event);
            if (event.url.indexOf('adminview') >= 0){
                console.log('------------GOT ADMINVIEW--------------');
                localStorage.setItem('isNewUser', 'false');
            }
            if (event.url.indexOf('logout') >= 0){
                localStorage.setItem('isNewUser', 'true');
            }
        }
      }, err => {
        console.log('Caught error', err);
      });
  }
}
