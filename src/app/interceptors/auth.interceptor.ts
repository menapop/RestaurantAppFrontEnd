import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let authReq;
         if(localStorage.getItem('token')!==null) {
          authReq = request.clone({
            headers: request.headers
              //.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
          });
        }
        else{
          authReq = request.clone({
            headers: request.headers

          });
        }

    return next.handle(authReq);
  }
}
