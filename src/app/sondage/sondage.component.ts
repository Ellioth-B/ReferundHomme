import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sondage } from 'src/app/models/Model';
import { SondageService }  from '../services/sondage.service';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit, OnDestroy {

  sondages: Sondage [];
  sondagesSubscription: Subscription;

  constructor(private sondagesService: SondageService) { }

  ngOnInit() { // au chargement du composent les sondages vont etre récuperer
    this.sondagesSubscription = this.sondagesService.sondagesSubject.subscribe(
      (sondages : Sondage[]) => {
        this.sondages = sondages;
      }     
    );
    this.sondagesService.getSondages();
    this.sondagesService.emitSondages();
  }

  ngOnDestroy() {
    this.sondagesSubscription.unsubscribe();
  }

}
