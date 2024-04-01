import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { consultationBean } from '../Beans/consultationBean';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  constructor(private http: HttpClient) { }

  addConsultation(idConsultant:string,consultation:consultationBean){
    return this.http.post('http://localhost:8080/IsticharaConsultation/api/consultation/ajouter-consultation/'+idConsultant,consultation)
  }

  getConsultation(idConsultation:string): Observable<consultationBean> {
    return this.http.get<consultationBean>('http://localhost:8080/IsticharaConsultation/api/consultation/'+idConsultation);
  }

  getConsultationByIdDomaineEtNomCategorie(idDomaine: string, nomCategorie: string, page: number, size: number): Observable<any[]> {
    const url = `http://localhost:8080/IsticharaConsultation/api/consultation/domaine/${idDomaine}/specialisation/${nomCategorie}?page=${page}&size=${size}`;
    return this.http.get<any[]>(url);
  }

}
