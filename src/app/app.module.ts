import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuUtilisateurComponent } from './Partie-Utilisateur/menu-utilisateur/menu-utilisateur.component';
import { AccueilUtilisateurComponent } from './Partie-Utilisateur/accueil-utilisateur/accueil-utilisateur.component';
import { BasDePageComponent } from './Partie-Utilisateur/bas-de-page/bas-de-page.component';
import { DomaineUtilisateurComponent } from './Partie-Utilisateur/domaine-utilisateur/domaine-utilisateur.component';
import { RechercheUtilisateurComponent } from './Partie-Utilisateur/recherche-utilisateur/recherche-utilisateur.component';
import { AproposUtilisateurComponent } from './Partie-Utilisateur/apropos-utilisateur/apropos-utilisateur.component';
import { ContactUtilisateurComponent } from './Partie-Utilisateur/contact-utilisateur/contact-utilisateur.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ConditionComponent } from './Partie-Utilisateur/condition/condition.component';
import { SinscrireComponent } from './Partie-Consultant/sinscrire/sinscrire.component';
import { ProfilConsultantUtilisateurComponent } from './Partie-Utilisateur/profil-consultant-utilisateur/profil-consultant-utilisateur.component';
import { SidentifierComponent } from './Partie-Consultant/sidentifier/sidentifier.component';
import { ProfilConsultantDashboardComponent } from './Partie-Consultant/profil-consultant-dashboard/profil-consultant-dashboard.component';
import { RendezvousConsultantDashboardComponent } from './Partie-Consultant/rendezvous-consultant-dashboard/rendezvous-consultant-dashboard.component';
import { HelpConsultantDashboardComponent } from './Partie-Consultant/help-consultant-dashboard/help-consultant-dashboard.component';
import { MenuConsultantDashboardComponent } from './Partie-Consultant/menu-consultant-dashboard/menu-consultant-dashboard.component';
import { ContactConsultantDashboardComponent } from './Partie-Consultant/contact-consultant-dashboard/contact-consultant-dashboard.component';
import { ConsultationsConsultantDashboardComponent } from './Partie-Consultant/consultations-consultant-dashboard/consultations-consultant-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuUtilisateurComponent,
    AccueilUtilisateurComponent,
    BasDePageComponent,
    DomaineUtilisateurComponent,
    RechercheUtilisateurComponent,
    AproposUtilisateurComponent,
    ContactUtilisateurComponent,
    ConditionComponent,
    SinscrireComponent,
    ProfilConsultantUtilisateurComponent,
    SidentifierComponent,
    ProfilConsultantDashboardComponent,
    RendezvousConsultantDashboardComponent,
    HelpConsultantDashboardComponent,
    MenuConsultantDashboardComponent,
    ContactConsultantDashboardComponent,
    ConsultationsConsultantDashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
