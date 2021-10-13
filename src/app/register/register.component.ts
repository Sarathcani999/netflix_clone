import { NgForm }   from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  isLoding = false;
  errorMessage = "";


  constructor(private auth : AuthService , private router : Router) { }

  ngOnInit(): void {
  }


  onRegister( authForm : NgForm) {

    this.isLoding = true;

    this.auth.registerUser(authForm.value).subscribe( response => {
      
      this.isLoding = false;
      localStorage.setItem('token' , response.idToken )
      this.router.navigate(['/home'])

    }, err => {
      // console.log(err)
      this.isLoding = false;
    })

  }

}
