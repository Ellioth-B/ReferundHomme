import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  loggedIn : boolean;

  constructor(private authenticationService : AuthenticationService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user){
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
      }
    );
  }

  onSignOut(){
    this.authenticationService.signOutUser();
  }

}
