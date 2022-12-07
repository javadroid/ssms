import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceApi {

  constructor(private http: HttpClient){}

   find(model:string):Observable<any>{
   return  this.http.get(`http://localhost:3333/api/${model}/`)
   }

   findAny(model:string,field:string,value:string):Observable<any>{
    return  this.http.get(`http://localhost:3333/api/${model}/${field}/${value}`)
    }

    update(model:string,id:string,update:any):Observable<any>{
      return this.http.patch(`http://localhost:3333/api/${model}/${id}`, update)
    }

    create(model:string,create:any):Observable<any>{
        return this.http.post(`http://localhost:3333/api/${model}`, create)
      }

      upload(model:string,file:any):Observable<any>{
        return this.http.post(`http://localhost:3333/api/${model}/file`, file)
      }

}
