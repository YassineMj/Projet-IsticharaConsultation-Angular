import { Component } from '@angular/core';
import { DomaineService } from '../Services/DomaineCategorie.service';
import { domaineBean } from '../Beans/domaineBean';
import { categorieBean } from '../Beans/categorieBean';
import { ConsultationService } from 'src/app/Partie-Consultant/Services/consultation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recherche-utilisateur',
  templateUrl: './recherche-utilisateur.component.html',
  styleUrls: ['./recherche-utilisateur.component.css'],
})
export class RechercheUtilisateurComponent {
  constructor(
    private _serviceDomaineCategorie: DomaineService,
    private _serviceConsultation: ConsultationService,
    private router: Router
  ) {}

  domaines: domaineBean[] = [];

  categories: categorieBean[] = [];

  nomCategorie: any;

  ngOnInit(): void {
    this._serviceDomaineCategorie.getAllDomaine().subscribe((resp) => {
      this.domaines = resp;
    });
  }

  idDomaine: string = '';

  onIdDomaineChange() {
    this._serviceDomaineCategorie
      .getCategorieByIddomaine(this.idDomaine)
      .subscribe((resp) => {
        this.categories = resp;
      });
  }

  dataConsultations: any;
  page: number = 0;
  size: number = 3;
  totalPages!: number;
  pageNumbers: number[] = [];

  getConsultations() {
    this._serviceConsultation
      .getConsultationByIdDomaineEtNomCategorie(
        this.idDomaine,
        this.nomCategorie,
        this.page,
        this.size
      )
      .subscribe(
        (resp: any) => {
          this.dataConsultations = resp.content;
          this.totalPages = resp.totalPages;
          this.generatePageNumbers();
        },
        (error) => {
          console.error(error);
        }
      );
    this.page = 0;
  }

  generatePageNumbers() {
    this.pageNumbers = Array.from(
      { length: this.totalPages },
      (_, index) => index
    );
  }

  goToPage(pageNumber: number) {
    this.page = pageNumber;
    this.getConsultations();
  }

  goToProfil(idConsultant: string) {
    this.router.navigate([
      '/utilisateur/profilConsultant-utilisateur',
      idConsultant,
    ]);
  }
}
