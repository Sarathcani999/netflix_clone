import { Component, OnInit , Output , EventEmitter , OnDestroy } from '@angular/core';
import {AuthService} from '../auth.service'
import {Subscription} from 'rxjs';
import {User} from '../models/user.model'

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit , OnDestroy {

  @Output() close = new EventEmitter<void>();
  userSubscription !: Subscription ;
  email : string = "" ;

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
    
    this.userSubscription = this.auth.userSub
      .subscribe((user : any) => {
        this.email = user.email;
      })

  }

  ngOnDestroy() : void {

    this.userSubscription.unsubscribe();

  }

  onClose(event : Event) {

    event.preventDefault();
    this.close.emit();
  }

  onLogout() {
    this.auth.logout();
    this.close.emit();
  }

}
