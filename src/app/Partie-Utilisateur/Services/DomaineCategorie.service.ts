import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domaineBean } from '../Beans/domaineBean';
import { Observable } from 'rxjs';
import { categorieBean } from '../Beans/categorieBean';
import { cosultantDomaineBean } from '../Beans/consultantDomainBean';


@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  constructor(private http: HttpClient) {}

  getAllDomaine() : Observable<domaineBean[]> {
    return this.http.get<domaineBean[]>('http://localhost:8080/IsticharaConsultation/api/domaines');
  }

  getCategorieByIddomaine(idDomaine:string) : Observable<categorieBean[]> {
    return this.http.get<categorieBean[]>('http://localhost:8080/IsticharaConsultation/api/categories/'+idDomaine);
  }

  getConsultantsByIddomaine(idDomaine:string): Observable<any[]> {
    return this.http.get<cosultantDomaineBean[]>('http://localhost:8080/IsticharaConsultation/api/consultant/'+idDomaine);
  }
}
