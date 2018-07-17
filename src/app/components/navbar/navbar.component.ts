import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";

import * as firebase from "firebase/app";
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user: Observable<firebase.User>;
  authenticated: boolean = false;
  constructor(private auth: AngularFireAuth,
    private as: AuthService) {

    this.auth.authState.subscribe((aa) => {
      if (aa != null) {

        this.user = this.auth.authState;
        this.authenticated = true;

      }


    });

  }

  ngOnInit() {
  }

  login() {

    // this.auth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    this.as.login();
    this.authenticated = true;

  }
  logout() {
    this.as.logout();
    this.authenticated = false;

  }
}
