import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Actualite } from '../models/Model';
import { ActualitesService } from '../services/actualites.service';
import { Sondage } from 'src/app/models/Model';
import { SondageService }  from '../services/sondage.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  actualites: Actualite [];
  actualitesSubscription: Subscription;
  sondages: Sondage [];
  sondagesSubscription: Subscription;

  constructor(private actualitesService: ActualitesService, private sondagesService: SondageService) { }

  

  ngOnInit() { // au chargement du composent les actualité vont etre récuperer
    this.actualitesSubscription = this.actualitesService.actualitesSubject.subscribe(
      (actualites : Actualite[]) => {
        this.actualites = actualites;
      }     
    );
    this.actualitesService.getActualites();
    this.actualitesService.emitActualites();
    
    this.sondagesSubscription = this.sondagesService.sondagesSubject.subscribe(
      (sondages : Sondage[]) => {
        this.sondages = sondages;
      }     
    );
    this.sondagesService.getSondages();
    this.sondagesService.emitSondages();
  }

  ngOnDestroy() {
    this.actualitesSubscription.unsubscribe();
    this.sondagesSubscription.unsubscribe();
  }

}
