import { Injectable } from '@angular/core';
import { Router , ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map,take } from 'rxjs/operators';

import { AuthService } from '../auth.service';


interface User {
  createdAt : string;
  email : string;
  emailVerified: boolean;
  lastLoginAt : string;
  lastRefreshAt : string;
  localOd: string;
  passwordHash: string;
  passwordUpdatedAt : string;
  providerUserInfo ?: any[] ;
  validSince ?: string;
}


@Injectable({
  providedIn: 'root'
})
export class UseraccessGuard implements CanActivate {

  constructor(private router: Router , private auth : AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | Promise<boolean> | UrlTree {

    const token : string | null = localStorage.getItem('token');

    if (!token) {
      return this.router.createUrlTree(['/login']);
    }

    return this.auth.getUser(token).pipe(map(user => {
      const isAuth = !!user;

      if (isAuth) {
        return true
      }

      return this.router.createUrlTree(['/login']);
    }))

  }
  
}
