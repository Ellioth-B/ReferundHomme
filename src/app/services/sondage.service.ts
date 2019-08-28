import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Sondage } from '../models/Model';

@Injectable({
  providedIn: 'root'
})
export class SondageService {

  sondages : Sondage [] = [];
  sondagesSubject = new Subject<Sondage[]>();

  constructor() { }

  emitSondages() {
    this.sondagesSubject.next(this.sondages);
  }

  saveSondages() {
    firebase.database().ref('/sondage').set(this.sondages);
  }

  createSondage(newSondage : Sondage) {
    this.sondages.push(newSondage);
    this.saveSondages();
    this.emitSondages();
  }

  removeSondage(sondage: Sondage) {
    const index = this.sondages.findIndex(
      (sondageElement) => {
        if (sondageElement === sondage) {
          return true;
        }
      }
    );
    this.sondages.splice(index, 1);
    this.saveSondages();
    this.emitSondages();
  }

  getSondages() {
    firebase.database().ref('/sondage').on('value', (data) => {
      this.sondages = data.val() ? data.val() : [];
      this.emitSondages();
    });
  }

  updateSondage(sondage : Sondage, id: number) {
    firebase.database().ref('/sondage/'+ id).update(sondage);
  }
}
