import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ServiceApi } from './service-api';

@Injectable()
export class JwtInterceptor  implements HttpInterceptor {

  constructor(private http: ServiceApi) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.http.getAuthToken();

console.log(token)
      if (token) {
        // If we have a token, we set it to the header
        request = request.clone({
           setHeaders: {Authorization: `Bearer ${token}`}
        });
     }

     return next.handle(request).pipe(tap(x=> console.log('yes')),
       catchError((err:any) => {
         if (err instanceof HttpErrorResponse) {
             if (err.status === 401) {
           console.log('oooooooooo')

           localStorage.setItem('token','')
          }
       }
       return throwError(err);
     })
      )

    }
}
