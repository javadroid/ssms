import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { error } from 'console';
import { catchError, Observable } from 'rxjs';
import { ServiceApi } from '../service/service-api';

@Injectable({
  providedIn: 'root'
})
export class PersonnelAuthGuard implements CanActivate {
  constructor(private http:ServiceApi,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


          console.log('CanActivate called');

        //  this.http.profile('organization').pipe(catchError(e=>{
        //   this.router.navigate(['/login']);
        //   is=false;
        //   return e
        // })).subscribe(a=>{
        //  is=true
        //  return is
        // });

        return this.http.profile('personnel')



  }

}
