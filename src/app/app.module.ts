import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SondageComponent } from './sondage/sondage.component';
import { ArchiveComponent } from './archive/archive.component';
import { TutoComponent } from './tuto/tuto.component';
import { SigninComponent } from './admin/signin/signin.component';
import { AdminAccueilComponent } from './admin/admin-accueil/admin-accueil.component';
import { AdminActualiteComponent } from './admin/admin-actualite/admin-actualite.component';

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
  {
    path: 'admin/login',
    component: SigninComponent
  },
  {
    path: 'admin/accueil',
    component: AdminAccueilComponent
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
    TutoComponent,
    SigninComponent,
    AdminAccueilComponent,
    AdminActualiteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
