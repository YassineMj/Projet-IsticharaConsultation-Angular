import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  infoClientPaiement={
    idClient:'',
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
    total:0,
    descriptionClient:'',
    numCard:'',
    dateExpMois:'',
    dateExpAnne:'',
    cvc:'',
    idCard:'',
    idConsultant:0
  }

  constructor(private http: HttpClient) { }

  getDetailsConsultation(idPlan:number): Observable<any> {
    return this.http.get<any>('http://localhost:8080/IsticharaConsultation/api/paiement/details-consultation/'+idPlan);
  }

  
  prendreRendezVous(demandeRequest:any):Observable<any> {
    return this.http.post('http://localhost:8080/IsticharaConsultation/api/paiement/creer-demande',demandeRequest);
  }

  checkRendezVous(idPlan:any):Observable<any> {
    return this.http.get('http://localhost:8080/IsticharaConsultation/api/plan/check-plan/'+idPlan);
  }

  reclamation(reclamationData:any):Observable<any> {
    return this.http.post('http://localhost:8080/IsticharaConsultation/api/reclamation/add-reclamation',reclamationData);
  }
}
