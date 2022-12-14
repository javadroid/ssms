import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {

  signedOrg$= new BehaviorSubject(true)
  signedPer$= new BehaviorSubject(false)
  getAuthToken() {
    return localStorage.getItem('token');
  }

  constructor(private http: HttpClient) {}


  find(model: string): Observable<any> {
    return this.http.get(`http://localhost:3333/api/${model}/`);
  }

  findAny(model: string, field: string, value: string): Observable<any> {
    return this.http.get(
      `http://localhost:3333/api/${model}/${field}/${value}`
    );
  }


  findOne(model: string, id: string): Observable<any> {
    return this.http.get(
      `http://localhost:3333/api/${model}/${id}`
    );
  }

  update(model: string, id: string, update: any): Observable<any> {
    return this.http.patch(`http://localhost:3333/api/${model}/${id}`, update);
  }

  create(model: string, create: any): Observable<any> {
    return this.http.post(`http://localhost:3333/api/${model}`, create);
  }

  upload(model: string, file: any): Observable<any> {
    return this.http.post(`http://localhost:3333/api/${model}`, file);
  }

  delete(model: string, id: string): Observable<any> {
    return this.http.delete(`http://localhost:3333/api/${model}/${id}`);
  }

  login(model: string, login: any): Observable<any> {
    return this.http
      .post(`http://localhost:3333/api/${model}/login`, login)
      .pipe(
        tap((x: any) => {
          localStorage.setItem('token', x.access_token);
          localStorage.setItem('id', x.user_id);
          localStorage.setItem('email', x.user_email);
          if(x.user==='organization')this.signedOrg$.next(x.isAuthenticated)
          if(x.user==='personnel ')this.signedPer$.next(x.isAuthenticated)
        })
      );
  }
  profile(model: string): Observable<any> {
    return this.http.get(`http://localhost:3333/api/${model}/profile`).pipe(
      tap((x: any) => {

        if(x.user==='organization')this.signedOrg$=new BehaviorSubject(true)
        if(x.user==='personnel ')this.signedPer$=new BehaviorSubject(true)

      }));
  }

  // isAuthenticated(){

  //   return this.isLoggedIn;
  // }

  users(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/${id}`);
  }


}
