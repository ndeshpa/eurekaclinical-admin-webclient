import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/observable';

@Injectable()
export class AllHttpInterceptor implements HttpInterceptor {
  intercept (request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request)
      .do(event => {
        if (event instanceof HttpResponse) {
            console.log(event);
        }
      }, err => {
        console.log('Caught error', err);
      });
  }
}
