import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RendezVousService {

  constructor(private http: HttpClient) { }

  getRendezVous(idConsultant:any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/IsticharaConsultation/api/paiement/rendez-vous-By-id-consultant/'+idConsultant);
  }
}
