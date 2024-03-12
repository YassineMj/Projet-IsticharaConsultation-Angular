import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { consultationBean } from '../Beans/consultationBean';

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private http: HttpClient) { }

  getConsultation(idConsultation:any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/IsticharaConsultation/api/consultation/get-consultation/'+idConsultation);
  }

  addPlan(plan:any){
    return this.http.post('http://localhost:8080/IsticharaConsultation/api/plan/ajouter-plan',plan);
  }

  deletePlan(id:any){
    return this.http.delete('http://localhost:8080/IsticharaConsultation/api/plan/delete-plan/'+id);
  }
}
