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

  refuseRendezVous(idRendezVous:any): Observable<any> {
    return this.http.get<any>('http://localhost:8080/IsticharaConsultation/api/paiement/refuse-rendez-vous/'+idRendezVous);
  }

  accepteRendezVous(lienRequest:any): Observable<any> {
    return this.http.post<any>('http://localhost:8080/IsticharaConsultation/api/paiement/accepte-rendez-vous',lienRequest);
  }

  getUrlParams(url: string) {
    let urlStr = url.split('?')[1];
    const urlSearchParams = new URLSearchParams(urlStr);
  
    // Construire l'objet souhaité
    const paramsObject: { [key: string]: string } = {};
  
    // Utilisez forEach directement sur l'objet urlSearchParams
    urlSearchParams.forEach((value, key) => {
      paramsObject[key] = value;
    });
  
    return paramsObject;
  }

  getUrl(){
    const roomID = this.getUrlParams(window.location.href)['roomID'] || (Math.floor(Math.random() * 10000) + "");
    return 'https://peervideochat.000webhostapp.com/Video-Conference/videoConference.html'+ '?roomID=' + roomID;

  }

}
