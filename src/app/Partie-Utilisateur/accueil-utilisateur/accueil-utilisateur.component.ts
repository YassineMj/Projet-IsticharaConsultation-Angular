import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { DomaineService } from '../Services/DomaineCategorie.service';
import { domaineBean } from '../Beans/domaineBean';
import { categorieBean } from '../Beans/categorieBean';
import { QuestionService } from '../Services/question.service';

@Component({
  selector: 'app-accueil-utilisateur',
  templateUrl: './accueil-utilisateur.component.html',
  styleUrls: ['./accueil-utilisateur.component.css'],
})
export class AccueilUtilisateurComponent implements OnInit {
  

   videoVisible: boolean = false;

  showVideo(event: Event): void {
    event.preventDefault();
    this.videoVisible = true;
  }

  hideVideo(): void {
    this.videoVisible = false;
  }
  
  constructor(private _service: DomaineService, private _serviceQuestion: QuestionService,private elRef: ElementRef) {

  }

  domaines: domaineBean[] = [];

  domainesParPage: domaineBean[] = [];
  currentPage: number = 0;
  totalPagesArray: number[] = [];
  pageSize: number = 3; 

  categories: categorieBean[] = [];

  faqList:any

  ngOnInit(): void {
    this.DomainesParPage()
    this._service.getAllDomaine().subscribe((resp) => {
      this.domaines = resp;
    });

    this._serviceQuestion.getAllQuestions().subscribe(
      resp=>{
        this.faqList=resp
      }
    )
  }

  idDomaine: string = '';

  onIdDomaineChange() {
    this._service.getCategorieByIddomaine(this.idDomaine).subscribe((resp) => {
      this.categories = resp;
    });

  }

  DomainesParPage() {
    this._service.getDomaineParPage(this.currentPage, this.pageSize).subscribe(
      (response: any) => {
        this.domainesParPage = response.content;
        this.totalPagesArray = Array.from({ length: response.totalPages }, (_, i) => i);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  goToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.DomainesParPage();
  }

 @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrollButton = this.elRef.nativeElement.querySelector('.scroll-to-top-button');

    if (scrollPosition > 300) {
      scrollButton.style.display = 'block';
    } else {
      scrollButton.style.display = 'none';
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
