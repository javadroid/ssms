import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '@env-api/environment'

@Injectable({
  providedIn: 'root'
})
export class PolicyInfoService {

  constructor(private http: HttpClient){}

   find(model:string):Observable<any>{
   return  this.http.get(`${environment.apiLink}/${model}/`)
   }

   findAny(model:string,field:string,value:string):Observable<any>{
    return  this.http.get(`${environment.apiLink}/${model}/${field}/${value}`)
    }

    update(model:string,id:string,update:any):Observable<any>{
      return this.http.patch(`${environment.apiLink}/${model}/${id}`, update)
    }
}
