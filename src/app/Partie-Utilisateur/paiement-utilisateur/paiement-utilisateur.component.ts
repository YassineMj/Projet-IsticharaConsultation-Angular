import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-paiement-utilisateur',
  templateUrl: './paiement-utilisateur.component.html',
  styleUrls: ['./paiement-utilisateur.component.css']
})
export class PaiementUtilisateurComponent {
  constructor(
    private router: Router,
  
  ) { }
  
ouvrirNouvelOnglet() {

    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/paiement-conditions'])
    );
    window.open(url, '_blank');
  }

}
