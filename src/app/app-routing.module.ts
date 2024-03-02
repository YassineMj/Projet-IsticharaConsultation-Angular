import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilUtilisateurComponent } from './Partie-Utilisateur/accueil-utilisateur/accueil-utilisateur.component';
import { MenuUtilisateurComponent } from './Partie-Utilisateur/menu-utilisateur/menu-utilisateur.component';
import { DomaineUtilisateurComponent } from './Partie-Utilisateur/domaine-utilisateur/domaine-utilisateur.component';
import { RechercheUtilisateurComponent } from './Partie-Utilisateur/recherche-utilisateur/recherche-utilisateur.component';
import { AproposUtilisateurComponent } from './Partie-Utilisateur/apropos-utilisateur/apropos-utilisateur.component';
import { ContactUtilisateurComponent } from './Partie-Utilisateur/contact-utilisateur/contact-utilisateur.component';
import { ConditionComponent } from './Partie-Utilisateur/condition/condition.component';


//routes partie utilisateur
const utilisateurRoutes:Routes=[

  {path:'' , redirectTo: 'accueil-utilisateur', pathMatch: 'full'},
  {path:'accueil-utilisateur' , component:AccueilUtilisateurComponent},
  {path:'domaine-utilisateur' , component:DomaineUtilisateurComponent},
  {path:'recherche-utilisateur' , component:RechercheUtilisateurComponent},
  {path:'apropos-utilisateur' , component:AproposUtilisateurComponent},
  {path:'contact-utilisateur' , component:ContactUtilisateurComponent},
 

]

const routes: Routes = [
  {path:'' , redirectTo: '/utilisateur/accueil-utilisateur', pathMatch: 'full'},
  {path:'utilisateur' , children:utilisateurRoutes},
  {path:'termes-conditions' , component:ConditionComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
