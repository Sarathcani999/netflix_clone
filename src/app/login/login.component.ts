import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'
import {NgForm} from '@angular/forms'

import {Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoading : boolean = false;

  email : string = "";
  password : string = "";

  errorMessage = "";


  constructor(private auth : AuthService , private router : Router) { }

  ngOnInit(): void {
  }


  onLogin( authForm : NgForm) {

    this.isLoading = true;

    const email = authForm.value.email
    const password = authForm.value.password

    this.auth.loginUser(authForm.value)
      .subscribe(
        response => {
          localStorage.setItem('token' , response.idToken )

          this.router.navigate(['/home'])

          setTimeout(() => {
            this.isLoading = false ;
          } , 1000)
        } ,
        error => {
          this.isLoading = false
          // console.log((error))
        }
        );

  }


}
