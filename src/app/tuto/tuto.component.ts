import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Tuto } from '../models/Model';
import { TutoService } from '../services/tuto.service';

@Component({
  selector: 'app-tuto',
  templateUrl: './tuto.component.html',
  styleUrls: ['./tuto.component.css']
})
export class TutoComponent implements OnInit, OnDestroy {

  tutos: Tuto [];
  tutosSubscription: Subscription;

  constructor(private tutosService: TutoService) { }

  ngOnInit() { 
    this.tutosSubscription = this.tutosService.tutosSubject.subscribe(
      (tutos : Tuto[]) => {
        this.tutos = tutos;
      }     
    );
    this.tutosService.getTutos();
    this.tutosService.emitTutos();
  }

  ngOnDestroy() {
    this.tutosSubscription.unsubscribe();
  }

}
