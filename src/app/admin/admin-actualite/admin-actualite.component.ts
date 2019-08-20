import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActualitesService } from 'src/app/services/actualites.service';
import { Actualite } from 'src/app/models/Actualite.model';

@Component({
  selector: 'app-admin-actualite',
  templateUrl: './admin-actualite.component.html',
  styleUrls: ['./admin-actualite.component.css']
})
export class AdminActualiteComponent implements OnInit {

  actualiteForm : FormGroup;

  constructor(private formBuilder: FormBuilder,
    private actualitesService: ActualitesService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.actualiteForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSaveActualite() {
    const id = this.actualiteForm.get('id').value;
    const title = this.actualiteForm.get('title').value;
    const description = this.actualiteForm.get('description').value;
/*  const photos = this.photosAdded ? this.photosAdded : [];*/
    const newActualite = new Actualite(title, description); //manque photos apres description
    this.actualitesService.createActualite(newActualite);
  }

}
