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


//routes partie utilisateur
const utilisateurRoutes:Routes=[

  {path:'' , redirectTo: 'accueil-utilisateur', pathMatch: 'full'},
  {path:'accueil-utilisateur' , component:AccueilUtilisateurComponent},
  {path:'domaine-utilisateur' , component:DomaineUtilisateurComponent},
  {path:'recherche-utilisateur' , component:RechercheUtilisateurComponent},
  {path:'apropos-utilisateur' , component:AproposUtilisateurComponent},
  { path: 'contact-utilisateur', component: ContactUtilisateurComponent },
  { path: 'profilConsultant-utilisateur/:idConsultant', component: ProfilConsultantUtilisateurComponent },
  {path:'infos-utilisateur',component:InfosUtilisateurComponent},
  { path: 'paiement-utilisateur', component: PaiementUtilisateurComponent },
  {path: 'infos-consultation-utilisateur', component:InfosConsultationUtilisateurComponent}
]

//routes partie consultant
const consultantRoutes:Routes=[

  {path:'sinscrire-consultant' , component:SinscrireComponent},
  { path: 'sidentifier-consultant', component: SidentifierComponent },
  { path: 'rendezvous-consultant-dashboard', component: RendezvousConsultantDashboardComponent },
  { path: 'profil-consultant-dashoard', component: ProfilConsultantDashboardComponent },
  { path: 'menu-consultant-dashboard', component: MenuConsultantDashboardComponent },
  { path: 'help-consultant-dashboard', component: HelpConsultantDashboardComponent },
  { path: 'contact-consultant-dashboard', component: ContactConsultantDashboardComponent },
  { path: 'consultations-consultant-dashboard', component: ConsultationsConsultantDashboardComponent },
  { path: 'plan-consultations-consultant-dashboard/:idConsultation', component: PlanConsultationConsultantDashboardComponent },

]

const routes: Routes = [
  {path:'' , redirectTo: '/utilisateur/accueil-utilisateur', pathMatch: 'full'},

  {path:'utilisateur' , children:utilisateurRoutes},
  {path:'consultant' , children:consultantRoutes},
  {path:'paiement-conditions',component:ConditionPaiementComponent},
  {path:'termes-conditions' , component:ConditionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
