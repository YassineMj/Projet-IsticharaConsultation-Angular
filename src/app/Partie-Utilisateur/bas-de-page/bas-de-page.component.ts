import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bas-de-page',
  templateUrl: './bas-de-page.component.html',
})
export class BasDePageComponent {

  constructor(private router: Router) {}

  ouvrirNouvelOnglet() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/termes-conditions'])
    );
    window.open(url, '_blank');
  }

}
