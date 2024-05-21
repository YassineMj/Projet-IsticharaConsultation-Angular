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
import { PlanConsultationConsultantDashboardComponent } from './Partie-Consultant/plan-consultation-consultant-dashboard/plan-consultation-consultant-dashboard.component';

import { FlatpickrModule } from 'angularx-flatpickr';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanConsultationUtilisateurComponent } from './Partie-Utilisateur/plan-consultation-utilisateur/plan-consultation-utilisateur.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTabsModule } from '@angular/material/tabs';
import { ConditionPaiementComponent } from './Partie-Utilisateur/condition-paiement/condition-paiement.component';
import { InfosUtilisateurComponent } from './Partie-Utilisateur/infos-utilisateur/infos-utilisateur.component';
import { PaiementUtilisateurComponent } from './Partie-Utilisateur/paiement-utilisateur/paiement-utilisateur.component';
import { InfosConsultationUtilisateurComponent } from './Partie-Utilisateur/infos-consultation-utilisateur/infos-consultation-utilisateur.component';
import { ActualitesUtilisateurComponent } from './Partie-Utilisateur/actualites-utilisateur/actualites-utilisateur.component';
import { RendezvousAccepteConsultantDashboardComponent } from './Partie-Consultant/rendezvous-accepte-consultant-dashboard/rendezvous-accepte-consultant-dashboard.component';
import { RendezvousRefuserConsultantDashboardComponent } from './Partie-Consultant/rendezvous-refuser-consultant-dashboard/rendezvous-refuser-consultant-dashboard.component';
import { SidentifierAdminComponent } from './Partie-Admin/sidentifier-admin/sidentifier-admin.component';
import { MenuAdminComponent } from './Partie-Admin/menu-admin/menu-admin.component';
import { DashboardAdminComponent } from './Partie-Admin/dashboard-admin/dashboard-admin.component';
import { DomaineCrudAdminComponent } from './Partie-Admin/domaine-crud-admin/domaine-crud-admin.component';
import { CategorieCrudAdminComponent } from './Partie-Admin/categorie-crud-admin/categorie-crud-admin.component';
import { QuestionCrudAdminComponent } from './Partie-Admin/question-crud-admin/question-crud-admin.component';
import { ConsultantDemandeAdminComponent } from './Partie-Admin/consultant-demande-admin/consultant-demande-admin.component';
import { ConsultantAccpeterAdminComponent } from './Partie-Admin/consultant-accpeter-admin/consultant-accpeter-admin.component';
import { ConsultationsVerificationAdminComponent } from './Partie-Admin/consultations-verification-admin/consultations-verification-admin.component';
import { BarChartComponent } from './Partie-Admin/bar-chart/bar-chart.component';
import { ProfilAdminComponent } from './Partie-Admin/profil-admin/profil-admin.component';
import { PieChartComponent } from './Partie-Admin/pie-chart/pie-chart.component';
import { DoughnutChartComponent } from './Partie-Admin/doughnut-chart/doughnut-chart.component';
import { BarHorizontalChartComponent } from './Partie-Admin/bar-horizontal-chart/bar-horizontal-chart.component';
import { PieAvisChartComponent } from './Partie-Admin/pie-avis-chart/pie-avis-chart.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { environment } from '../../environments';
import { ChatComponent } from './Partie-Admin/chat/chat.component';



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
    ConsultationsConsultantDashboardComponent,
    PlanConsultationConsultantDashboardComponent,
    PlanConsultationUtilisateurComponent,
    ConditionPaiementComponent,
    InfosUtilisateurComponent,
    PaiementUtilisateurComponent,
    InfosConsultationUtilisateurComponent,
    ActualitesUtilisateurComponent,
    RendezvousAccepteConsultantDashboardComponent,
    RendezvousRefuserConsultantDashboardComponent,
    SidentifierAdminComponent,
    MenuAdminComponent,
    DashboardAdminComponent,
    DomaineCrudAdminComponent,
    CategorieCrudAdminComponent,
    QuestionCrudAdminComponent,
    ConsultantDemandeAdminComponent,
    ConsultantAccpeterAdminComponent,
    ConsultationsVerificationAdminComponent,
    BarChartComponent,
    ProfilAdminComponent,
    PieChartComponent,
    DoughnutChartComponent,
    BarHorizontalChartComponent,
    PieAvisChartComponent,
    ChatComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

    NgbModule,
    NgbModalModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSelectModule,
    MatIconModule,
    MatCheckboxModule,
    MatTabsModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
