import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SondageComponent } from './sondage/sondage.component';
import { ArchiveComponent } from './archive/archive.component';
import { TutoComponent } from './tuto/tuto.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'accueil',
    component: HomeComponent
  },
  {
    path: 'sondage',
    component: SondageComponent
  },
  {
    path: 'archive',
    component: ArchiveComponent
  },
  {
    path: 'instructions',
    component: TutoComponent
  },
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    SondageComponent,
    ArchiveComponent,
    TutoComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
