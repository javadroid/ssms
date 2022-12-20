import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

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
      `http://localhost:3333/api/${model}/${id}}`
    );
  }

  update(model: string, id: string, update: any): Observable<any> {
    return this.http.patch(`http://localhost:3333/api/${model}/${id}`, update);
  }

  create(model: string, create: any): Observable<any> {
    return this.http.post(`http://localhost:3333/api/${model}`, create);
  }


  search(model: string, query: string): Observable<any> {
    return this.http.post(`http://localhost:3333/api/${model}/search`, { query });
  }

  delete(model: string, id: any): Observable<any> {
    return this.http.delete(`http://localhost:3333/api/${model}/${id}`);
  }

}
