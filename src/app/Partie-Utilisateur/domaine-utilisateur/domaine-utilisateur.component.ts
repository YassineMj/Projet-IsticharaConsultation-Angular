import { Component, OnInit ,ViewChild ,ElementRef } from '@angular/core';
import { DomaineService } from '../Services/DomaineCategorie.service';
import { domaineBean } from '../Beans/domaineBean';
import { categorieBean } from '../Beans/categorieBean';
import { cosultantDomaineBean } from '../Beans/consultantDomainBean';
import { Router } from '@angular/router';

@Component({
  selector: 'app-domaine-utilisateur',
  templateUrl: './domaine-utilisateur.component.html',
  styleUrls: ['./domaine-utilisateur.component.css'],
})
export class DomaineUtilisateurComponent implements OnInit {

  @ViewChild('tabWrapper1') tabWrapper1!: ElementRef;
  @ViewChild('tabWrapper2') tabWrapper2!: ElementRef;

  constructor(private _service: DomaineService, private router: Router) {}

  domaineList: domaineBean[] = [];

 ngOnInit(): void {
  this._service.getAllDomaine().subscribe(
    (resp) => {
      this.domaineList = resp;
      this.initializeLists(this.domaineList[0].idDomaine);
    },
    (error) => {
      console.error(error);
    }
  );
}

initializeLists(idDomaine: string) {
  this.getCategories(idDomaine);
  this.getConsultants(idDomaine);
}


  categorieList: categorieBean[] = [];
  getCategories(idDomaine: string) {
    this._service.getCategorieByIddomaine(idDomaine).subscribe(
      (resp) => {
        this.categorieList = resp;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  consultantList: cosultantDomaineBean[] = [];
  getConsultants(idDomaine: string) {
  this._service.getConsultantsByIddomaine(idDomaine).subscribe(
    (resp) => {
      this.consultantList = resp;
    },
    (error) => {
      console.error('Erreur lors de la récupération des consultants:', error);
    }
  );
  }



 scrollLeftHandler(tabWrapper: HTMLDivElement) {
    if (tabWrapper) {
      tabWrapper.scrollBy({ left: -200, behavior: 'smooth' });
      this.updateButtons(tabWrapper);
    }
  }

  scrollRightHandler(tabWrapper: HTMLDivElement) {
    if (tabWrapper) {
      tabWrapper.scrollBy({ left: 200, behavior: 'smooth' });
      this.updateButtons(tabWrapper);
    }
  }

  updateButtons(tabWrapper: HTMLDivElement) {
    if (tabWrapper) {
      const leftBtn = document.querySelector('.left-btn') as HTMLButtonElement;
      const rightBtn = document.querySelector('.right-btn') as HTMLButtonElement;

      leftBtn.disabled = tabWrapper.scrollLeft === 0;
      rightBtn.disabled = tabWrapper.clientWidth + tabWrapper.scrollLeft >= tabWrapper.scrollWidth;
    }
  }
  

  goToProfil(idConsultant: string) {
    this.router.navigate([
      '/utilisateur/profilConsultant-utilisateur',
      idConsultant,
    ]);
  }
}
