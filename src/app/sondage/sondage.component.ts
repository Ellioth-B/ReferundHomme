import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Sondage } from 'src/app/models/Model';
import { SondageService } from '../services/sondage.service';

@Component({
  selector: 'app-sondage',
  templateUrl: './sondage.component.html',
  styleUrls: ['./sondage.component.css']
})
export class SondageComponent implements OnInit, OnDestroy {

  sondages: Sondage[];
  sondagesSubscription: Subscription;

  pointA = 1;
  pointB = 1;
  totalVotes = this.pointA + this.pointB;
  percentA = (this.pointA / this.totalVotes) * 100;
  percentB = (this.pointB / this.totalVotes) * 100;
  size = this.percentA + "% " + this.percentB + "%";

  constructor(private sondagesService: SondageService) { }

  ngOnInit() { // au chargement du composent les sondages vont etre récuperer
    this.sondagesSubscription = this.sondagesService.sondagesSubject.subscribe(
      (sondages: Sondage[]) => {
        this.sondages = sondages;
      }
    );
    this.sondagesService.getSondages();
    this.sondagesService.emitSondages();
  }

  addleft() {
    this.pointA += 1;
    this.totalVotes += 1;
    this.updatePoints();
    /* console.log(this.pointA + ' ' + this.pointB);
    console.log(this.totalVotes); */
  }

  addright() {
    this.pointB += 1;
    this.totalVotes += 1;
    this.updatePoints();
    /* console.log(this.pointA + ' ' + this.pointB);
    console.log(this.totalVotes); */
  }

  updatePoints() {
    this.percentA = (this.pointA / this.totalVotes) * 100;
    this.percentB = (this.pointB / this.totalVotes) * 100;
    this.size = this.percentA + "% " + this.percentB + "%";

    document.getElementById("size-one").innerHTML = Math.round(this.percentA) + '%';
    document.getElementById("size-two").innerHTML = Math.round(this.percentB) + '%';
    document.getElementById("voting-box").style.gridTemplateColumns = this.percentA + "% " + this.percentB + "%";

    /* pas obliger d'y faire apparaitre aux users  */

    /* document.getElementById("total-votes").innerHTML = "Nombre de votes totaux: " + this.totalVotes;
    document.getElementById("total-left").innerHTML = "Option A: " + this.pointA;
    document.getElementById("total-right").innerHTML = "Option B: " + this.pointB; */

    /* pas obliger d'y faire apparaitre aux users  */

  }

  ngOnDestroy() {
    this.sondagesSubscription.unsubscribe();
  }

}
