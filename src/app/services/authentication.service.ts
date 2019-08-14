import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signInUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
            console.log('Tu est connecter')
          },
          (error) => {
            reject(error)
          }
        )
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
    console.log("Tu est déconnecter")
  }
}
