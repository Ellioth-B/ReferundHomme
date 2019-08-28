import { Component, OnInit, OnDestroy } from '@angular/core';
import { Actualite } from '../models/Actualite.model';
import { Subscription } from 'rxjs';
import { ActualitesService } from '../services/actualites.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  actualites: Actualite [];
  actualitesSubscription: Subscription;

  constructor(private actualitesService: ActualitesService) { }

  

  ngOnInit() { // au chargement du composent les actualité vont etre récuperer
    this.actualitesSubscription = this.actualitesService.actualitesSubject.subscribe(
      (actualites : Actualite[]) => {
        this.actualites = actualites;
      }     
    );
    this.actualitesService.getActualites();
    this.actualitesService.emitActualites();
  }

  ngOnDestroy() {
    this.actualitesSubscription.unsubscribe();
  }

}
