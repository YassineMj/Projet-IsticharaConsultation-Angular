import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-infos-utilisateur',
  templateUrl: './infos-utilisateur.component.html',
  styleUrls: ['./infos-utilisateur.component.css']
})
export class InfosUtilisateurComponent {
  constructor(
    private router: Router,
  
  ) { }
  
ouvrirNouvelOnglet() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/termes-conditions'])
    );
    window.open(url, '_blank');
  }

}
