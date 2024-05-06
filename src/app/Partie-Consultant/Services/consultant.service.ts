import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { consultantBean } from '../Beans/consultantBean';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  consultantAuthObjet:any=null

  constructor(private http: HttpClient) {}

  addConsultant(consultantInfo:any) {
    return this.http.post<string>('http://localhost:8080/IsticharaConsultation/api/demande-Compte/add-demande-compte', consultantInfo);
  }

  getConsultantProfil(idConsultant:string): Observable<consultantBean> {
    return this.http.get<consultantBean>('http://localhost:8080/IsticharaConsultation/api/consultant/profil-consultant/'+idConsultant);
  }

  authConsultant(consultant:any): Observable<consultantBean>{
    return this.http.post<consultantBean>('http://localhost:8080/IsticharaConsultation/api/consultant/auth',consultant);
  }

  updateConsultant(consultant:any): Observable<consultantBean>{
    return this.http.put<consultantBean>('http://localhost:8080/IsticharaConsultation/api/consultant/update-consultant',consultant);
  }

}
