import { Component, OnInit, OnDestroy} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TutoService } from 'src/app/services/tuto.service';
import { Tuto } from 'src/app/models/Model';
import { Subscription } from 'rxjs';
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-tuto',
  templateUrl: './admin-tuto.component.html',
  styleUrls: ['./admin-tuto.component.css']
})
export class AdminTutoComponent implements OnInit, OnDestroy {

  tutoForm : FormGroup;
  tutos: Tuto[];
  tutosSubscription: Subscription;
  editTuto: boolean = false;
  photoUploading: boolean = false;
  photoUrl: string;
  photoUploaded: boolean = false;

  constructor(private formBuilder: FormBuilder, private tutosService: TutoService) { }

  ngOnInit() {
    this.initForm();
    this.tutosSubscription = this.tutosService.tutosSubject.subscribe(
      (tutos: Tuto[]) => {
        this.tutos = tutos;
      }
    );
    this.tutosService.getTutos();
    this.tutosService.emitTutos();
  }

  initForm() {
    this.tutoForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      subtitle: [''],
      description: ['', Validators.required],
      photo : [''],
    });
  }

  resetTutoForm() {
    this.editTuto = false;
    this.tutoForm.reset();
  }

  onSaveTuto() {
    const id = this.tutoForm.get('id').value;
    const title = this.tutoForm.get('title').value;
    const subtitle = this.tutoForm.get('subtitle').value;
    const description = this.tutoForm.get('description').value;
    const newTuto = new Tuto(title, subtitle, description);
    if (this.photoUrl && this.photoUrl !== '') {
      newTuto.photo = this.photoUrl;
    }

    if(this.editTuto == true) {
      this.tutosService.updateTuto(newTuto, id)
    } else {
      this.tutosService.createTuto(newTuto);
    }
    this.resetTutoForm();
    this.photoUploaded = false; // une fois que le form est reset, photoUploaded devient false
    this.photoUrl = ''; // une fois que le form est reset, photoUrl devient vide (pr acceuilir prochaine photo)
  }

  ngOnDestroy() {
    this.tutosSubscription.unsubscribe();
  }

  onDeleteTuto(tuto: Tuto) {
    this.tutosService.removeTuto(tuto);
    if (tuto.photo) { // si photo existe alors on supprime
      this.tutosService.removeTutoPhoto(tuto.photo);
    }
  }

  onEditTuto(tuto: Tuto, id :number) {
    this.tutoForm.get('id').setValue(id);
    this.tutoForm.get('title').setValue(tuto.title);
    this.tutoForm.get('subtitle').setValue(tuto.subtitle);
    this.tutoForm.get('description').setValue(tuto.description);
    this.editTuto = true;
  }

  detectFile(event) {
    this.photoUploading = true; // si detect photo, elle es en train de chargé
    this.tutosService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoUrl = url;
        this.photoUploading = false; // si on a l'url alors photo plus en train de chargé
        this.photoUploaded = true;
      }
    ) // fichier envoyer sous forme de tabl, récupere le 1ere elemtn avec [0]
  }
}
