import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  infoClientPaiement={
    idPlan:0,
    nomClient:'',
    emailClient:'',
    paysClient:'',
    villeClient:'',
    codePostaleClient:'',
    provinceClient:'',
    telephoneClient:'',
    adresseClient:'',
    nomConsultant:'',
    prenomConsultant:'',
    prixConsultation:0,
    jourDebut:'',
    dateJourDebut:'',
    heureDebut:'',
    heureFin:'',
    anglais:"false",
    arabe:"false",
    espagnol:"false",
    francais:"false",
    duree:0,
    fraisService:0,
    total:0
  }

  constructor(private http: HttpClient) { }

  getDetailsConsultation(idPlan:number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/IsticharaConsultation/api/paiement/details-consultation/'+idPlan);
  }
}
