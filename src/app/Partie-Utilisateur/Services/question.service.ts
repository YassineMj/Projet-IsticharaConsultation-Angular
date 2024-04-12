import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/IsticharaConsultation/api/question/all');
  }
}
