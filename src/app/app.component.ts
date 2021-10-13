import { Component , OnInit } from '@angular/core';
import {AuthService} from './auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'netflix';

  constructor(private auth : AuthService) {}

  ngOnInit() : void {
    const token = localStorage.getItem('token')
    if (token) {

      // console.log(token)
      this.auth.getUser(token)
        .subscribe(user => {
          // console.log(user)
        })
    }
  }
  
}
