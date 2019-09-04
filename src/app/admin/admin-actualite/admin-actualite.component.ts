import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActualitesService } from 'src/app/services/actualites.service';
import { Actualite } from 'src/app/models/Model';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-actualite',
  templateUrl: './admin-actualite.component.html',
  styleUrls: ['./admin-actualite.component.css']
})
export class AdminActualiteComponent implements OnInit, OnDestroy {

  actualiteForm : FormGroup;
  actualites: Actualite[];
  actualitesSubscription: Subscription;
  editActualite: boolean = false;
  photoUploading: boolean = false;
  photoUrl: string;
  photoUploaded: boolean = false;

  constructor(private formBuilder: FormBuilder,
    private actualitesService: ActualitesService) { }

  ngOnInit() {
    this.initForm();
    this.actualitesSubscription = this.actualitesService.actualitesSubject.subscribe(
      (actualites: Actualite[]) => {
        this.actualites = actualites;
      }
    );
    this.actualitesService.getActualites();
    this.actualitesService.emitActualites();
  }

  initForm() {
    this.actualiteForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  resetActualiteForm() {
    this.editActualite = false;
    this.actualiteForm.reset();
  }

  onSaveActualite() {
    const id = this.actualiteForm.get('id').value;
    const title = this.actualiteForm.get('title').value;
    const description = this.actualiteForm.get('description').value;
/*  const photos = this.photosAdded ? this.photosAdded : [];*/
    const newActualite = new Actualite(title, description); //manque photos apres description
    if (this.photoUrl && this.photoUrl !== '') {
      newActualite.photo = this.photoUrl;
    }

    if(this.editActualite == true) {
      this.actualitesService.updateActualite(newActualite, id)
    } else {
      this.actualitesService.createActualite(newActualite);
    }
    this.resetActualiteForm();
    this.photoUploaded = false; // une fois que le form est reset, photoUploaded devient false
    this.photoUrl = ''; // une fois que le form est reset, photoUrl devient vide (pr acceuilir prochaine photo)
  }

  ngOnDestroy() {
    this.actualitesSubscription.unsubscribe();
  }

  onDeleteActualite(actualite: Actualite) {
    this.actualitesService.removeActualite(actualite);
    if (actualite.photo) { // si photo existe alors on supprime
      this.actualitesService.removeActualitePhoto(actualite.photo);
    }
  }

  onEditActualite(actualite: Actualite, id :number) {
    this.actualiteForm.get('id').setValue(id);
    this.actualiteForm.get('title').setValue(actualite.title);
    this.actualiteForm.get('description').setValue(actualite.description);
    this.editActualite = true;
  }

  detectFile(event) {
    this.photoUploading = true; // si detect photo, elle es en train de chargé
    this.actualitesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoUrl = url;
        this.photoUploading = false; // si on a l'url alors photo plus en train de chargé
        this.photoUploaded = true;
      }
    ) // fichier envoyer sous forme de tabl, récupere le 1ere elemtn avec [0]
  }

}
