import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../Services/paiement.service';

@Component({
  selector: 'app-infos-utilisateur',
  templateUrl: './infos-utilisateur.component.html',
  styleUrls: ['./infos-utilisateur.component.css']
})
export class InfosUtilisateurComponent implements OnInit{

  villesMaroc: string[] = [
    "Agadir",
    "Al Hoceïma",
    "Asilah",
    "Azrou",
    "Beni Mellal",
    "Berkane",
    "Berrechid",
    "Casablanca",
    "Chefchaouen",
    "Dakhla",
    "El Jadida",
    "Essaouira",
    "Fès",
    "Fnideq",
    "Guelmim",
    "Ifrane",
    "Kénitra",
    "Khouribga",
    "Laâyoune",
    "Larache",
    "Marrakech",
    "Meknès",
    "Mohammédia",
    "Nador",
    "Ouarzazate",
    "Oujda",
    "Rabat",
    "Safi",
    "Salé",
    "Tanger",
    "Témara",
    "Tétouan",
    "Tiznit",
];



  constructor(
    private router: Router, private route: ActivatedRoute, public _serviceClientPaiement:PaiementService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this._serviceClientPaiement.infoClientPaiement.idPlan = +params['idPlan']; 
    });
  }
  
ouvrirNouvelOnglet() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/termes-conditions'])
    );
    window.open(url, '_blank');
  }

}
