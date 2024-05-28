import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilUtilisateurComponent } from './Partie-Utilisateur/accueil-utilisateur/accueil-utilisateur.component';
import { MenuUtilisateurComponent } from './Partie-Utilisateur/menu-utilisateur/menu-utilisateur.component';
import { DomaineUtilisateurComponent } from './Partie-Utilisateur/domaine-utilisateur/domaine-utilisateur.component';
import { RechercheUtilisateurComponent } from './Partie-Utilisateur/recherche-utilisateur/recherche-utilisateur.component';
import { AproposUtilisateurComponent } from './Partie-Utilisateur/apropos-utilisateur/apropos-utilisateur.component';
import { ContactUtilisateurComponent } from './Partie-Utilisateur/contact-utilisateur/contact-utilisateur.component';
import { ConditionComponent } from './Partie-Utilisateur/condition/condition.component';
import { SinscrireComponent } from './Partie-Consultant/sinscrire/sinscrire.component';
import { ProfilConsultantUtilisateurComponent } from './Partie-Utilisateur/profil-consultant-utilisateur/profil-consultant-utilisateur.component';
import { SidentifierComponent } from './Partie-Consultant/sidentifier/sidentifier.component';
import { RendezvousConsultantDashboardComponent } from './Partie-Consultant/rendezvous-consultant-dashboard/rendezvous-consultant-dashboard.component';
import { ProfilConsultantDashboardComponent } from './Partie-Consultant/profil-consultant-dashboard/profil-consultant-dashboard.component';
import { MenuConsultantDashboardComponent } from './Partie-Consultant/menu-consultant-dashboard/menu-consultant-dashboard.component';
import { HelpConsultantDashboardComponent } from './Partie-Consultant/help-consultant-dashboard/help-consultant-dashboard.component';
import { ContactConsultantDashboardComponent } from './Partie-Consultant/contact-consultant-dashboard/contact-consultant-dashboard.component';
import { ConsultationsConsultantDashboardComponent } from './Partie-Consultant/consultations-consultant-dashboard/consultations-consultant-dashboard.component';
import { PlanConsultationConsultantDashboardComponent } from './Partie-Consultant/plan-consultation-consultant-dashboard/plan-consultation-consultant-dashboard.component';
import { InfosUtilisateurComponent } from './Partie-Utilisateur/infos-utilisateur/infos-utilisateur.component';
import { PaiementUtilisateurComponent } from './Partie-Utilisateur/paiement-utilisateur/paiement-utilisateur.component';
import { ConditionPaiementComponent } from './Partie-Utilisateur/condition-paiement/condition-paiement.component';
import { InfosConsultationUtilisateurComponent } from './Partie-Utilisateur/infos-consultation-utilisateur/infos-consultation-utilisateur.component';
import { ActualitesUtilisateurComponent } from './Partie-Utilisateur/actualites-utilisateur/actualites-utilisateur.component';
import { RendezvousAccepteConsultantDashboardComponent } from './Partie-Consultant/rendezvous-accepte-consultant-dashboard/rendezvous-accepte-consultant-dashboard.component';
import { RendezvousRefuserConsultantDashboardComponent } from './Partie-Consultant/rendezvous-refuser-consultant-dashboard/rendezvous-refuser-consultant-dashboard.component';
import { SidentifierAdminComponent } from './Partie-Admin/sidentifier-admin/sidentifier-admin.component';
import { MenuAdminComponent } from './Partie-Admin/menu-admin/menu-admin.component';
import { QuestionCrudAdminComponent } from './Partie-Admin/question-crud-admin/question-crud-admin.component';
import { DomaineCrudAdminComponent } from './Partie-Admin/domaine-crud-admin/domaine-crud-admin.component';
import { DashboardAdminComponent } from './Partie-Admin/dashboard-admin/dashboard-admin.component';
import { CategorieCrudAdminComponent } from './Partie-Admin/categorie-crud-admin/categorie-crud-admin.component';
import { ConsultantDemandeAdminComponent } from './Partie-Admin/consultant-demande-admin/consultant-demande-admin.component';
import { ConsultantAccpeterAdminComponent } from './Partie-Admin/consultant-accpeter-admin/consultant-accpeter-admin.component';
import { ConsultationsVerificationAdminComponent } from './Partie-Admin/consultations-verification-admin/consultations-verification-admin.component';
import { ProfilAdminComponent } from './Partie-Admin/profil-admin/profil-admin.component';
import { ChatComponent } from './Partie-Admin/chat/chat.component';
import { ReclamationUtilisateurComponent } from './Partie-Utilisateur/reclamation-utilisateur/reclamation-utilisateur.component';
import { ListReclamationAdminComponent } from './Partie-Admin/list-reclamation-admin/list-reclamation-admin.component';
import { Statement } from '@angular/compiler';
import { StatistiqueConsultantComponent } from './Partie-Consultant/statistique-consultant/statistique-consultant.component';

//routes partie utilisateur
const utilisateurRoutes: Routes = [
  { path: '', redirectTo: 'accueil-utilisateur', pathMatch: 'full' },
  { path: 'accueil-utilisateur', component: AccueilUtilisateurComponent },
  { path: 'domaine-utilisateur', component: DomaineUtilisateurComponent },
  { path: 'recherche-utilisateur', component: RechercheUtilisateurComponent },
  { path: 'apropos-utilisateur', component: AproposUtilisateurComponent },
  { path: 'contact-utilisateur', component: ContactUtilisateurComponent },
  { path: 'reclamation-utilisateur', component: ReclamationUtilisateurComponent },
  {
    path: 'profilConsultant-utilisateur/:idConsultant',
    component: ProfilConsultantUtilisateurComponent,
  },
  { path: 'infos-utilisateur/:idPlan', component: InfosUtilisateurComponent },
  { path: 'paiement-utilisateur', component: PaiementUtilisateurComponent },
  {
    path: 'infos-consultation-utilisateur',
    component: InfosConsultationUtilisateurComponent,
  },
  { path: 'actualites-utilisateur', component: ActualitesUtilisateurComponent },
];

//admins Rout
const adminRoutes: Routes = [

  { path: '', redirectTo: 'dashboard-admin', pathMatch: 'full' },
  { path: 'question-admin', component: QuestionCrudAdminComponent },
  { path: 'domaine-admin', component: DomaineCrudAdminComponent },
  { path: 'dashboard-admin', component: DashboardAdminComponent },
  { path: 'categorie-admin', component: CategorieCrudAdminComponent },
  { path: 'profil-admin', component: ProfilAdminComponent },
   { path: 'reclamation-admin', component: ListReclamationAdminComponent },
  { path: 'chat-admin', component: ChatComponent },


  {
    path: 'consultant-demande-admin',
    component: ConsultantDemandeAdminComponent,
  },
  {
    path: 'consultant-accepter-admin',
    component: ConsultantAccpeterAdminComponent,
  },
  {
    path: 'consultation-verification-admin',
    component: ConsultationsVerificationAdminComponent,
  },
];

//routes partie consultant
const consultantRoutes: Routes = [
  { path: 'sinscrire-consultant', component: SinscrireComponent },
  { path: 'sidentifier-consultant', component: SidentifierComponent },
  {
    path: 'rendezvous-consultant-dashboard',
    component: RendezvousConsultantDashboardComponent,
  },
  {
    path: 'profil-consultant-dashoard',
    component: ProfilConsultantDashboardComponent,
  },
  {
    path: 'menu-consultant-dashboard',
    component: MenuConsultantDashboardComponent,
  },
  {
    path: 'help-consultant-dashboard',
    component: HelpConsultantDashboardComponent,
  },
  {
    path: 'contact-consultant-dashboard',
    component: ContactConsultantDashboardComponent,
  },
  {
    path: 'consultations-consultant-dashboard',
    component: ConsultationsConsultantDashboardComponent,
  },
  {
    path: 'plan-consultations-consultant-dashboard/:idConsultation',
    component: PlanConsultationConsultantDashboardComponent,
  },
  {
    path: 'rendezvous-accepte-consultant-dashboard',
    component: RendezvousAccepteConsultantDashboardComponent,
  },
  {
    path: 'rendezvous-refuser-consultant-dashboard',
    component: RendezvousRefuserConsultantDashboardComponent,
  },
  {
    path: 'statistique-consultant-dashboard',
    component: StatistiqueConsultantComponent,
  },
];

const routes: Routes = [
  {
    path: '',
    redirectTo: '/utilisateur/accueil-utilisateur',
    pathMatch: 'full',
  },
  { path: 'utilisateur', children: utilisateurRoutes },
  { path: 'consultant', children: consultantRoutes },
  { path: 'admin', component: MenuAdminComponent, children: adminRoutes },
  { path: 'paiement-conditions', component: ConditionPaiementComponent },
  { path: 'termes-conditions', component: ConditionComponent },
  { path: 'admin-sidentifier', component: SidentifierAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
