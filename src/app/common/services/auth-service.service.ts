import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if(localStorage.getItem('userwuewwoeV1') == null && localStorage.getItem('userwuewwoeV1') == undefined) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
