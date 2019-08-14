import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(){
    // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyAizMXTXeP-5Bk32LIzxz2ojKBosJuzc3o",
    authDomain: "referundhomme.firebaseapp.com",
    databaseURL: "https://referundhomme.firebaseio.com",
    projectId: "referundhomme",
    storageBucket: "",
    messagingSenderId: "94502268220",
    appId: "1:94502268220:web:61bfc4f8bdaa5842"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  }
}
