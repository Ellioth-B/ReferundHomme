import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';
import { Tuto } from '../models/Model';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class TutoService {

  tutos : Tuto[] = [];
  tutosSubject = new Subject<Tuto[]>();

  constructor() { }

  emitTutos() {
    this.tutosSubject.next(this.tutos);
  }

  saveTutos() {
    firebase.database().ref('/instructions').set(this.tutos);
  }

  createTuto(newTuto : Tuto) {
    this.tutos.push(newTuto);
    this.saveTutos();
    this.emitTutos();
  }

  removeTuto(tuto: Tuto) {
    const index = this.tutos.findIndex(
      (tutoElement) => {
        if (tutoElement === tuto) {
          return true;
        }
      }
    );
    this.tutos.splice(index, 1);
    this.saveTutos();
    this.emitTutos();
  }

  getTutos() {
    firebase.database().ref('/instructions').on('value', (data) => {
      this.tutos = data.val() ? data.val() : [];
      this.emitTutos();
    });
  }

  updateTuto(tuto : Tuto, id: number) {
    firebase.database().ref('/instructions/'+ id).update(tuto);
  }

  uploadFile(file : File) {
    return new Promise(
      (resolve, reject) => {
        const uniqueId = Date.now().toString();
        const upload = firebase.storage().ref().child('image/instructions/'+ uniqueId + file.name).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement...'); // possible de mettre animation a l'écran le temps du chargement
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

  removeTutoPhoto(photoLink : string) {
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
