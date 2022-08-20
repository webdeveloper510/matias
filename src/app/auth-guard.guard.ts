import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  user:any=''
  userDetails:any
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let user=localStorage.getItem('user')
      this.user=user
      this.userDetails=JSON.parse(this.user)
      console.log(this.userDetails)
      if(this.userDetails!=null){
        return true
      }
      else{
        return false
      }
  }

}
