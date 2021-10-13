import { Injectable } from '@angular/core';
import { Router , ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable ,of} from 'rxjs';
import { map,take , catchError } from 'rxjs/operators';

import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class DebuggingGuard implements CanActivate {
  

  constructor(private router: Router , private auth : AuthService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | Promise<boolean> {

    const token : string | null = localStorage.getItem('token');

    if (!token) {
      return true;
    }

    return this.auth.getUser(token).pipe(map(user => {
      const isAuth = !!user;

      if (isAuth) {
        return this.router.createUrlTree(['/home'])
      }

      return true;
    }),catchError((error : any) => {

      // console.log("token not valid")
      return of(true)

    }))

  }
  
}
