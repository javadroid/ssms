import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from '@env-api/environment'


// const apiUrl ='https://api.mrssms.com/api'
const apiUrl  ='http://localhost:3322/api'

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
  signedOrg$ = new BehaviorSubject(true);
  signedPer$ = new BehaviorSubject(false);
  getAuthToken() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) {}

  find(model: string): Observable<any> {
    return this.http.get(`${apiUrl}/${model}/`);
  }

  findAny(model: string, field: string, value: string): Observable<any> {
    return this.http.get(
      `${apiUrl}/${model}/${field}/${value}`
    );
  }

  findOne(model: string, id: string): Observable<any> {
    return this.http.get(`${apiUrl}/${model}/${id}`);
  }

  update(model: string, id: string, update: any): Observable<any> {
    return this.http.patch(`${apiUrl}/${model}/${id}`, update);
  }

  create(model: string, create: any): Observable<any> {
    return this.http.post(`${apiUrl}/${model}`, create);
  }

  upload(model: string, file: any): Observable<any> {
    return this.http.post(`${apiUrl}/${model}`, file);
  }

  delete(model: string, id: string): Observable<any> {
    return this.http.delete(`${apiUrl}/${model}/${id}`);
  }

  login(model: string, login: any): Observable<any> {
    return this.http
      .post(`${apiUrl}/${model}/login`, login)
      .pipe(
        tap((x: any) => {
          localStorage.setItem('token', x.access_token);
          localStorage.setItem('id', x.user_id);
          localStorage.setItem('email', x.user_email);
          if (x.user === 'organization')
            this.signedOrg$.next(x.isAuthenticated);
          if (x.user === 'personnel ') this.signedPer$.next(x.isAuthenticated);
        })
      );
  }
  profile(model: string): Observable<any> {
    return this.http.get(`${apiUrl}/${model}/profile`).pipe(
      tap((x: any) => {
        if (x.user === 'organization')
          this.signedOrg$ = new BehaviorSubject(true);
        if (x.user === 'personnel ')
          this.signedPer$ = new BehaviorSubject(true);
      })
    );
  }


  users(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/${id}`);
  }

  lga(id: string): Observable<any> {
    return this.http.get(`https://api.facts.ng/v1/states/lagos`);
  }

  resetpassword(model: string, pass: any): Observable<any> {
    return this.http.patch(
      `${apiUrl}/${model}/resetpassword`,
      pass
    );
  }

  sendMail(model: string,data:any): Observable<any>{
    return this.http.post(`${apiUrl}/${model}`,data)
  }
}
