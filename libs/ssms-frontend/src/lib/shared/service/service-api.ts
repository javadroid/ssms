import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServiceApi {
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

  login(model: string, login: any): Observable<any> {
    return this.http
      .post(`http://localhost:3333/api/${model}/login`, login)
      .pipe(
        tap((x: any) => {
          localStorage.setItem('token', x.access_token);
          localStorage.setItem('id', x.user_id);
        })
      );
  }
  profile(model: string): Observable<any> {
    return this.http.get(`http://localhost:3333/api/${model}/profile`);
  }

  users(id: string): Observable<any> {
    return this.http.get(`https://dummyjson.com/users/${id}`);
  }
}
