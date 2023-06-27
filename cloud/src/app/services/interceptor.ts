import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable()
export class Interceptor implements HttpInterceptor {

  intercept(
    request: HttpRequest<any>, 
    next: HttpHandler
    ): Observable<HttpEvent<any>> {
      if (localStorage.getItem("user") === null) {

        return next.handle(request);

      }

      const accessToken: any = localStorage.getItem('user');
      const decTok:any = jwt_decode(accessToken);
      const email = decTok.email; // Extract the email field from the decoded token

    const decodedItem = JSON.parse(accessToken);
    if (request.headers.get('skip')) return next.handle(request);
    if (accessToken) {
      const cloned = request.clone({
        headers: request.headers.set('Authorization', decodedItem).set('Useremail', email)
      });

      return next.handle(cloned);
    } else {
      return next.handle(request);
    }
      
  }
}
