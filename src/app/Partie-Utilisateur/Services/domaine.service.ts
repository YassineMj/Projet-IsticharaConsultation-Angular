import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { domaineBeans } from '../Beans/DomaineBean';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DomaineService {

  constructor(private http: HttpClient) {}

  getAllDomaine() : Observable<domaineBeans[]> {
    return this.http.get<domaineBeans[]>('http://localhost:8080/IsticharaConsultation/api/domaines');
  }

}
