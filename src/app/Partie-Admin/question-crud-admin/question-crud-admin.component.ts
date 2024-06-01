import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-crud-admin',
  templateUrl: './question-crud-admin.component.html',
  styleUrls: ['./question-crud-admin.component.css']
})
export class QuestionCrudAdminComponent implements OnInit {

  searchTerm: string = '';
  filtered:any

  constructor(private _serviceAdmin: AdminService , private router: Router) {}

  showSearchInput: boolean = false;
  showSuccessMessage: boolean = false;
  showInfoMessage: boolean = false;
  showDangerMessage: boolean = false;
  
  listQuestions:any

  questionData={
    question:"",
    reponse:""
  }

   isFormComplete(): boolean {

     return !!this.questionData.question &&
            !!this.questionData.reponse;
    
  }
  
 toggleSearchInput(inputElement: HTMLInputElement) {
   this.showSearchInput = !this.showSearchInput;
     if (!this.showSearchInput) {
      inputElement.value = '';
    }
   
  }
  ngOnInit(): void {

    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
    
    this._serviceAdmin.getAllQuestions().subscribe(
      resp=>{
        this.listQuestions=resp;
        this.filtered=this.listQuestions
      }
    )
  }

  filter(): void {
    if (this.searchTerm) {
      this.listQuestions = this.filtered.filter((o: any) =>
        o.question?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        o.reponse?.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.listQuestions = this.filtered; // Reset to all data if search term is cleared
    }
  }


  ajouterQuestion(){
    this._serviceAdmin.addQuestion(this.questionData).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"ajouter",
          description:"Ajouter question "+this.questionData.question,
          date:new Date(),
          idAdmin:this._serviceAdmin.authAdminObjet.id
        }

        this._serviceAdmin.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            
          }
        );

        
        // Show success message
        this.showSuccessMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 3000);
        

        this.questionData.question="";
        this.questionData.reponse="";
        this.ngOnInit();
        
      }
    )
  }

  questionDataUpdate:any=null;
  getQuestionById(idQuestion:any){
    this._serviceAdmin.getQuestionById(idQuestion).subscribe(
      resp=>{
        this.questionDataUpdate=resp;
      }
    )
  }

  updateQuestion(){
    this._serviceAdmin.updateQuestion(this.questionDataUpdate.id,this.questionDataUpdate).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"modifier",
          description:"Modifier question "+this.questionDataUpdate.question,
          date:new Date(),
          idAdmin:this._serviceAdmin.authAdminObjet.id
        }

        this._serviceAdmin.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            
          }
        );

            // Show success message
        this.showInfoMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showInfoMessage = false;
        }, 3000);
        this.ngOnInit();
        
      }
    )
  }


  questionToDeleteId: number;
  questionToDeleteName: string;

  // Méthode pour stocker les informations du domaine à supprimer
  setQuestionToDelete(id: number, nom: string): void {
    this.questionToDeleteId = id;
    this.questionToDeleteName = nom;
  }


  deleteQuestion(idQuestion:any , question:any){
    this._serviceAdmin.deleteQuestion(idQuestion).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"supprimer",
          description:"Supprimer question "+question,
          date:new Date(),
          idAdmin:this._serviceAdmin.authAdminObjet.id
        }

        this._serviceAdmin.addActivity(dataActivity).subscribe(
          (response) => {
            console.log('Activité ajoutée avec succès !', response);
            
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de l\'activité : ', error);
            
          }
        );

          // Show success message
        this.showDangerMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showDangerMessage = false;
        }, 3000);
        this.ngOnInit();
        
      }
    )
  }

}
