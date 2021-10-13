import { Component, OnInit,OnDestroy } from '@angular/core';
import { HostListener } from '@angular/core';
import {AuthService} from '../auth.service'
import {Subscription} from 'rxjs';

// @HostListener('window:scroll', ['$event'])

@HostListener('window:scroll', ['$event']) 
    

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit , OnDestroy {

  isAuth : boolean = false;
  private userSubscription !: Subscription ;

  constructor(private auth : AuthService) { }

  userProfile : boolean = false;  

  ngOnInit(): void {

    this.userSubscription = this.auth.userSub.subscribe((user : any) => {
      this.isAuth = !!user;
    })

  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  onOpenUserProfile() {
    this.userProfile = true;
  }

  closeModal() {
    this.userProfile = false;
  }

}
