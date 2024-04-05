import { Component, OnInit } from '@angular/core';
import { PaiementService } from '../Services/paiement.service';

@Component({
  selector: 'app-infos-consultation-utilisateur',
  templateUrl: './infos-consultation-utilisateur.component.html',
  styleUrls: ['./infos-consultation-utilisateur.component.css']
})
export class InfosConsultationUtilisateurComponent implements OnInit {

  constructor(public _serviceClientPaiement:PaiementService){}

  ngOnInit(): void {
    console.log(this._serviceClientPaiement.infoClientPaiement);
    this._serviceClientPaiement.getDetailsConsultation(this._serviceClientPaiement.infoClientPaiement.idPlan).subscribe(
      resp=>{
        console.log(resp);
        
        this._serviceClientPaiement.infoClientPaiement.nomConsultant=resp.nom;
        this._serviceClientPaiement.infoClientPaiement.prenomConsultant=resp.prenom;
        this._serviceClientPaiement.infoClientPaiement.prixConsultation=parseFloat(resp.prixConsultation);
        this._serviceClientPaiement.infoClientPaiement.jourDebut=resp.jourDebut;
        this._serviceClientPaiement.infoClientPaiement.dateJourDebut=resp.dateJourDebut;
        this._serviceClientPaiement.infoClientPaiement.heureDebut=resp.heureDebut;
        this._serviceClientPaiement.infoClientPaiement.heureFin=resp.heureFin;
        this._serviceClientPaiement.infoClientPaiement.anglais=resp.anglais;
        this._serviceClientPaiement.infoClientPaiement.arabe=resp.arabe;
        this._serviceClientPaiement.infoClientPaiement.espagnol=resp.espagnol;
        this._serviceClientPaiement.infoClientPaiement.francais=resp.francais;
        this._serviceClientPaiement.infoClientPaiement.fraisService=(resp.prixConsultation*10)/100;
        this._serviceClientPaiement.infoClientPaiement.total = (this._serviceClientPaiement.infoClientPaiement.fraisService + this._serviceClientPaiement.infoClientPaiement.prixConsultation);

        // Supposons que resp.heureFin et resp.heureDebut sont des chaînes représentant des heures au format HH:mm
const heureFinParts = resp.heureFin.split(":");
const heureDebutParts = resp.heureDebut.split(":");

// Convertir les parties de l'heure en entiers
const heureFin = parseInt(heureFinParts[0]);
const minuteFin = parseInt(heureFinParts[1]);
const heureDebut = parseInt(heureDebutParts[0]);
const minuteDebut = parseInt(heureDebutParts[1]);

// Calculer la différence en minutes
const differenceEnMinutes = (heureFin * 60 + minuteFin) - (heureDebut * 60 + minuteDebut);

// Affecter la durée en minutes à infoClientPaiement.duree
this._serviceClientPaiement.infoClientPaiement.duree = differenceEnMinutes;

      },
      error=>{
        console.error(error);
        
      }
    )
  }

  
}
