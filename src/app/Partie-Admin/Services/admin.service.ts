import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class AdminService {

  private baseUrl = 'http://localhost:8080/IsticharaConsultation/api/domaines/';

  private baseUrlQuestions = 'http://localhost:8080/IsticharaConsultation/api/question/';

  private baseUrlCategorie = 'http://localhost:8080/IsticharaConsultation/api/categories/';

  private baseUrlDemandeCompte = 'http://localhost:8080/IsticharaConsultation/api/demande-Compte/';

  private baseUrlConsultant = 'http://localhost:8080/IsticharaConsultation/api/consultant/';

  private baseUrlStatistique = 'http://localhost:8080/IsticharaConsultation/api/statistique/';

  private apiUrlAdmin = 'http://localhost:8080/IsticharaConsultation/api/admin/auth'; // URL de votre API Spring Boot

  private apiUrlReclamation='http://localhost:8080/IsticharaConsultation/api/paiement/reclamation'

  constructor(private http: HttpClient) {}

  addActivity(request: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/IsticharaConsultation/api/admin/add-activity`, request);
  }

  getActivitiesByAdminId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/IsticharaConsultation/api/admin/get-activity/${id}`);
  }


  valideReclamation(idRendezVous: number): Observable<any> {
    const url = `http://localhost:8080/IsticharaConsultation/api/paiement/valide-reclamation/${idRendezVous}`;
    return this.http.post<any>(url, {});
  }

  getRendezVousReclamation(reclamationId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrlReclamation}/${reclamationId}`);
  }

  countPlansByConsultantId(idConsultant: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrlStatistique}plan-consultant/${idConsultant}`);
  }

  countRvByDomaine(idDomaine: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlStatistique}count-rv-domaine/${idDomaine}`);
  }

  countRvByConsultant(consultantId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrlStatistique}rv-consultant/${consultantId}`);
  }

  countConsultationsPlansByDomaine(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrlStatistique}consultation-plan-domaine`);
  }

  authAdminObjet:any=null;

  updateAdmin(id: number, admin: any): Observable<any> {
    return this.http.put<any>('http://localhost:8080/IsticharaConsultation/api/admin/'+id, admin);
  }

  authenticateAdmin(loginData:any): Observable<any> {
    return this.http.post<any>(this.apiUrlAdmin, loginData);

  }

  getCountAll(): Observable<any> {
    return this.http.get<any>(this.baseUrlStatistique + 'count-all');
  }

  getCountCategorieConsultantParDomaine(): Observable<any> {
    return this.http.get<any>(this.baseUrlStatistique + 'count-categorie-consultant-par-domaine');
  }

  createDomaine(domaine: any): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'add-domaine', domaine);
  }

  getAllDomaines(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'get-all-domaines');
  }

  getDomaineById(idDomaine: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + 'get-domaine/' + idDomaine);
  }

  updateDomaine(idDomaine: string, domaineRequest: any): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'put-domaine/' + idDomaine, domaineRequest);
  }

  deleteDomaine(idDomaine: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'delete-domaine/' + idDomaine);
  }

  addCategorie(idDomaine: string, categorieRequest: any): Observable<any> {
    return this.http.post<any>(this.baseUrlCategorie + `add-category/${idDomaine}`, categorieRequest);
  }

  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlCategorie + 'get-all-category');
  }

  getCategorieById(idCategory: string): Observable<any> {
    return this.http.get<any>(this.baseUrlCategorie + `get-category/${idCategory}`);
  }

  updateCategorie(idCategory: string, idDomaine: string, categorieRequest: any): Observable<any> {
    return this.http.put<any>(this.baseUrlCategorie + `put-category/${idCategory}/${idDomaine}`, categorieRequest);
  }

  deleteCategorie(idCategorie: string): Observable<any> {
    return this.http.delete<any>(this.baseUrlCategorie + `delete-category/${idCategorie}`);
  }

  addQuestion(question: any): Observable<any> {
    return this.http.post<any>(this.baseUrlQuestions + 'add-question', question);
  }

  getAllQuestions(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlQuestions + 'get-all-questions');
  }

  getQuestionById(idQuestion: number): Observable<any> {
    return this.http.get<any>(this.baseUrlQuestions + 'get-question/' + idQuestion);
  }

  updateQuestion(idQuestion: number, updatedQuestion: any): Observable<any> {
    return this.http.put<any>(this.baseUrlQuestions + 'update-question/' + idQuestion, updatedQuestion);
  }

  deleteQuestion(idQuestion: number): Observable<any> {
    return this.http.delete<any>(this.baseUrlQuestions + 'delete-question/' + idQuestion);
  }

  getAllDemandeCompte(): Observable<any> {
    return this.http.get<any>(this.baseUrlDemandeCompte + 'get-all-demande-compte');
  }

  getDemandeCompteById(idDemande: string): Observable<any> {
    return this.http.get<any>(this.baseUrlDemandeCompte + `get-demande-compte/${idDemande}`);
  }

  activeCompte(idDemande: string): Observable<any> {
    return this.http.post<any>(this.baseUrlDemandeCompte + `active-compte/${idDemande}`, null);
  }

  getConsultantById(idConsultant: string): Observable<any> {
    return this.http.get<any>(this.baseUrlConsultant +'profil-consultant/'+ idConsultant);
  }

  getAllConsultants(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrlConsultant + 'get-all-consultant');
  }


}
