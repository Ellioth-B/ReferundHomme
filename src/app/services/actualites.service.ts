import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Actualite } from '../models/Actualite.model';
import { Subject } from 'rxjs';
import { reject } from 'q';

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
    const index = this.actualites.findIndex(
      (actualiteElement) => {
        if (actualiteElement === actualite) {
          return true;
        }
      }
    );
    this.actualites.splice(index, 1);
    this.saveActualites();
    this.emitActualites();
  }

  getActualites() {
    firebase.database().ref('/actualites').on('value', (data) => {
      this.actualites = data.val() ? data.val() : [];
      this.emitActualites();
    });
  }

  updateActualite(actualite : Actualite, id: number) {
    firebase.database().ref('/actualites/'+ id).update(actualite);
  }

  uploadFile(file : File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const upload = firebase.storage().ref().child('image/actualites/'+ uniqueId + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...'); // possible de mettre animationa  l'écran le temps du chargement
          },
          (error) => {
            console.log('Erreur ! :' + error);
            reject();
          }, // dés que chargement complet (voir code en dessous)
          () => {
            upload.snapshot.ref.getDownloadURL().then(function(downloadURL) {
              resolve(downloadURL);
            });
          }

        );

      }
    );
  }

  removeActualitePhoto(photoLink : string) {
    if (photoLink) {
      const storageRef = firebase.storage().refFromURL(photoLink); //lien de la photo
      storageRef.delete().then(
        () => {
          console.log('Fichier supprimer');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé : '+ error);
        }
      );
    }
  }
}
