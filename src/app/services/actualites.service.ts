import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Actualite } from '../models/Actualite.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActualitesService {

  actualites : Actualite[] = [];
  actualitesSubject = new Subject<Actualite[]>();

  constructor() { }

  emitActualites() {
    this.actualitesSubject.next(this.actualites);
  }

  saveActualites() {
    firebase.database().ref('/actualites').set(this.actualites);
  }

  createActualite(newActualite : Actualite) {
    this.actualites.push(newActualite);
    this.saveActualites();
    this.emitActualites();
  }

  removeActualite(actualite: Actualite) {
    
  }
}
