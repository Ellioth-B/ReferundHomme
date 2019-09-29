import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Sondage } from 'src/app/models/Model';
import { SondageService } from 'src/app/services/sondage.service';

@Component({
  selector: 'app-admin-sondage',
  templateUrl: './admin-sondage.component.html',
  styleUrls: ['./admin-sondage.component.css']
})
export class AdminSondageComponent implements OnInit, OnDestroy {

  sondagesSubscription : Subscription;
  sondages: Sondage[];
  sondageForm: FormGroup;
  editSondage: boolean = false;

  constructor(private formBuilder: FormBuilder, private sondagesService: SondageService) { }

  ngOnInit() {
    this.initForm();
    this.sondagesSubscription = this.sondagesService.sondagesSubject.subscribe(
      (sondages: Sondage[]) => {
        this.sondages = sondages;
      }
    );
    this.sondagesService.getSondages();
    this.sondagesService.emitSondages();
  }

  initForm() {
    this.sondageForm = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      subtitle: [''],
      description: ['', Validators.required],
      lieu_un: ['', Validators.required],
      lieu_deux: ['', Validators.required]
    });
  }

  resetSondageForm() {
    this.editSondage = false;
    this.sondageForm.reset();
  }

  onSaveSondage() {
    const id = this.sondageForm.get('id').value;
    const title = this.sondageForm.get('title').value;
    const subtitle = this.sondageForm.get('subtitle').value;
    const description = this.sondageForm.get('description').value;
    const lieu_un = this.sondageForm.get('lieu_un').value;
    const lieu_deux = this.sondageForm.get('lieu_deux').value;
    const newSondage = new Sondage(title, subtitle, description, lieu_un, lieu_deux);

    if(this.editSondage == true) {
      this.sondagesService.updateSondage(newSondage, id)
    } else {
      this.sondagesService.createSondage(newSondage);
    }
    this.resetSondageForm();
  }

  onDeleteSondage(sondage: Sondage) {
    this.sondagesService.removeSondage(sondage);
  }

  onEditSondage(sondage: Sondage, id :number) {
    this.sondageForm.get('id').setValue(id);
    this.sondageForm.get('title').setValue(sondage.title);
    this.sondageForm.get('subtitle').setValue(sondage.subtitle);
    this.sondageForm.get('description').setValue(sondage.description);
    this.sondageForm.get('lieu_un').setValue(sondage.lieu_un);
    this.sondageForm.get('lieu_deux').setValue(sondage.lieu_deux);
    this.editSondage = true;
  }

  ngOnDestroy() {
    this.sondagesSubscription.unsubscribe();
  }

}
