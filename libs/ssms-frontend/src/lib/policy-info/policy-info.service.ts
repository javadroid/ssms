import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicyInfoService {

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
}
