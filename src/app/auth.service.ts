import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable,BehaviorSubject} from 'rxjs'

import { environment } from '../environments/environment'

import {Router} from '@angular/router';

import {tap, map} from 'rxjs/operators'

import {User} from './models/user.model';
// import { Observer } from 'rxjs/Observer' ;



// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDCZ_GVCznf04dJqf_OLL7Au1mlxeEwcUc


interface SignUpResponseData {
  idToken : string ;
  email : string ;
  refreshToken : string ;
  expiresIn : string ;
  localId : string;
}

interface LoginResponseData {
  idToken : string ;
  email : string ;
  refreshToken : string ;
  expiresIn : string ;
  localId : string;
  registered : string;
  displayName : string ;
}

interface GetUserResponseData {
  kind : string ;
  users : User[] ;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_KEY = environment.firebaseAPIKey;
  userSub = new BehaviorSubject<User | null>(null);

  constructor(private http : HttpClient , private router : Router) { }


  registerUser(user : {email : string , password : string}){


    return this.http
      .post<SignUpResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}` ,
      {'email' : user.email , 'password' : user.password , returnSecureToken : true})
  }

  loginUser(user : {email : string , password : string}){
    return this.http
          .post<LoginResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}` ,
          {'email' : user.email , 'password' : user.password , returnSecureToken : true})
          .pipe(tap(response => {
            const user = new User(response.email , response.localId , response.idToken)

            this.userSub.next(user);
          }))
  }

  logout() {
    this.userSub.next(null);
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getUser(token : string) {

    const requestBody = {idToken : token}

    return this.http.post<GetUserResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${this.API_KEY}`,
        requestBody
      )
      .pipe(tap((response : GetUserResponseData) => {
        // console.log("IN TAP")
        // console.log(JSON.parse(response));
        // console.log(response)
      }) , map((response : GetUserResponseData) => {

        const resData = response.users[0] ;

        const user = new User(resData.email , resData.localId , token);
        this.userSub.next(user);

        return user;
      }))
  }

  // checkTokenValid(token : string) {
  //   // console.log("token : " , token)
  //   return this.http
  //     .post(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDCZ_GVCznf04dJqf_OLL7Au1mlxeEwcUc` ,
  //         {'idToken' : token}
  //       )
  // }
  // test(token : string) {
  //   return Observable.create((observer : any )=> {
  //     setTimeout( () => {
  //       observer.next('SUCC');
  //     }, 2000)
  //   })

  // }

}
