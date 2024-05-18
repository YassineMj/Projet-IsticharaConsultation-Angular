import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question-crud-admin',
  templateUrl: './question-crud-admin.component.html',
  styleUrls: ['./question-crud-admin.component.css']
})
export class QuestionCrudAdminComponent implements OnInit {

  constructor(private _serviceAdmin: AdminService , private router: Router) {}


  listQuestions:any

  questionData={
    question:"",
    reponse:""
  }

  ngOnInit(): void {

    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }
    
    this._serviceAdmin.getAllQuestions().subscribe(
      resp=>{
        this.listQuestions=resp;
      }
    )
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

        this.ngOnInit();
        
      }
    )
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

        this.ngOnInit();
        
      }
    )
  }

}
