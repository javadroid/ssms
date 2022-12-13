import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { error } from 'console';
import { catchError, Observable } from 'rxjs';
import { ServiceApi } from '../service/service-api';

@Injectable({
  providedIn: 'root'
})
export class CanAuth implements CanLoad {
  constructor(private http:ServiceApi,private router:Router){}
  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return false
  }




}
