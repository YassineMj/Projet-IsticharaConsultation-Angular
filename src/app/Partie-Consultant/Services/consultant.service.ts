import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConsultantService {

  constructor(private http: HttpClient) {}

  addConsultant(consultantInfo:any) {
    return this.http.post<string>('http://localhost:8080/IsticharaConsultation/api/consultant', consultantInfo);
  }
}
