import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env-api/environment'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  find(model: string): Observable<any> {
    return this.http.get(`${environment.apiLink}/${model}/`);
  }

  findAny(model: string, field: string, value: string): Observable<any> {
    return this.http.get(
      `${environment.apiLink}/${model}/${field}/${value}`
    );
  }

  findOne(model: string, id: string): Observable<any> {
    return this.http.get(
      `${environment.apiLink}/${model}/${id}}`
    );
  }

  update(model: string, id: string, update: any): Observable<any> {
    return this.http.patch(`${environment.apiLink}/${model}/${id}`, update);
  }

  create(model: string, create: any): Observable<any> {
    return this.http.post(`${environment.apiLink}/${model}`, create);
  }


  search(model: string, query: string): Observable<any> {
    return this.http.post(`${environment.apiLink}/${model}/search`, { query });
  }

  delete(model: string, id: any): Observable<any> {
    return this.http.delete(`${environment.apiLink}/${model}/${id}`);
  }

}
