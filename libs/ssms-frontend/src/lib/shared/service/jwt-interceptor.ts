import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { ServiceApi } from './service-api';

@Injectable()
export class JwtInterceptor  implements HttpInterceptor {

  constructor(private http: ServiceApi,private route:Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const token = this.http.getAuthToken();

// console.log(token)
      if (token) {
        // If we have a token, we set it to the header
        request = request.clone({
           setHeaders: {Authorization: `Bearer ${token}`}
        });
     }

     return next.handle(request).pipe(
       catchError((err:any) => {
         if (err instanceof HttpErrorResponse) {
             if (err.status === 401 ||err.status===500) {
           this.route.navigate(['/login']);

           localStorage.clear()
          }
       }
       return throwError(err);
     })
      )

    }
}
