import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { consultantBean } from '../Beans/consultantBean';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private http: HttpClient) {}

  addConsultant(consultantInfo:any) {
    return this.http.post<string>('http://localhost:8080/IsticharaConsultation/api/consultant', consultantInfo);
  }

  getConsultantProfil(idConsultant:string): Observable<consultantBean> {
    return this.http.get<consultantBean>('http://localhost:8080/IsticharaConsultation/api/consultant/profil-consultant/'+idConsultant);
  }

}
