import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../Services/paiement.service';

@Component({
  selector: 'app-infos-utilisateur',
  templateUrl: './infos-utilisateur.component.html',
  styleUrls: ['./infos-utilisateur.component.css'],
})
export class InfosUtilisateurComponent implements OnInit {
  nomVide: boolean = false;
  emailVide: boolean = false;
  paysVide: boolean = false;
  villeVide: boolean = false;
  codeVide: boolean = false;
  provinceVide: boolean = false;
  telephoneVide: boolean = false;
  adresseVide: boolean = false;
  descriptionVide: boolean = false;
  conditionsAccepted = false;
  emailInvalid: boolean = false;
  phoneInvalid: boolean = false;
  nomInvalid: boolean = false;
  codeInvalid: boolean = false;
  validateEmail() {
    const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    this.emailInvalid = !emailRegex.test(
      this._serviceClientPaiement.infoClientPaiement.emailClient.trim()
    );
  }
  validatePhone() {
    const phoneRegex = /^\+212[5-7]{1}\d{8}$/;

    this.phoneInvalid = !phoneRegex.test(
      this._serviceClientPaiement.infoClientPaiement.telephoneClient.trim()
    );
  }
  validateNom() {
    const nomRegex = /^[a-zA-Z]{4,20}$/;
    this.nomInvalid = !nomRegex.test(
      this._serviceClientPaiement.infoClientPaiement.nomClient.trim()
    );
  }
  validateCode() {
    const codeRegex = /^\d+$/;
    this.codeInvalid= !codeRegex.test(this._serviceClientPaiement.infoClientPaiement.codePostaleClient.trim( ));
  }

  validateInfos() {
    // Valider chaque champ
    this.validateNom();
    this.validateEmail();
    this.validatePhone();
    this.validateCode();
    this.nomVide =
      this._serviceClientPaiement.infoClientPaiement.nomClient === '';
    this.emailVide =
      this._serviceClientPaiement.infoClientPaiement.emailClient === '';
    this.paysVide =
      this._serviceClientPaiement.infoClientPaiement.paysClient === '';
    this.villeVide =
      this._serviceClientPaiement.infoClientPaiement.villeClient === '';
    this.codeVide =
      this._serviceClientPaiement.infoClientPaiement.codePostaleClient === '';
    this.provinceVide =
      this._serviceClientPaiement.infoClientPaiement.provinceClient === '';
    this.telephoneVide =
      this._serviceClientPaiement.infoClientPaiement.telephoneClient === '';
    this.adresseVide =
      this._serviceClientPaiement.infoClientPaiement.adresseClient === '';
    this.descriptionVide =
      this._serviceClientPaiement.infoClientPaiement.descriptionClient === '';

    if (
      this.nomVide ||
      this.emailVide ||
      this.paysVide ||
      this.codeVide ||
      this.villeVide ||
      this.descriptionVide ||
      this.telephoneVide ||
      this.adresseVide ||
      this.provinceVide ||
      this.nomInvalid ||
      this.emailInvalid ||
      this.phoneInvalid|| this.codeInvalid
    ) {
      return;
    } else {
      if (this.conditionsAccepted) {
        this.router.navigate(['/utilisateur/infos-consultation-utilisateur']);
      } else {
        alert('veuillez accpeter les conditions');
      }
    }
  }

  villesMaroc: string[] = [
    'Agadir',
    'Al Hoceïma',
    'Asilah',
    'Azrou',
    'Beni Mellal',
    'Berkane',
    'Berrechid',
    'Casablanca',
    'Chefchaouen',
    'Dakhla',
    'El Jadida',
    'Essaouira',
    'Fès',
    'Fnideq',
    'Guelmim',
    'Ifrane',
    'Kénitra',
    'Khouribga',
    'Laâyoune',
    'Larache',
    'Marrakech',
    'Meknès',
    'Mohammédia',
    'Nador',
    'Ouarzazate',
    'Oujda',
    'Rabat',
    'Safi',
    'Salé',
    'Tanger',
    'Témara',
    'Tétouan',
    'Tiznit',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public _serviceClientPaiement: PaiementService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
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
