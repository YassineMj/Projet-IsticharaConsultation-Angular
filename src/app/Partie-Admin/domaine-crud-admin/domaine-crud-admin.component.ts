import { Component, OnInit } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-domaine-crud-admin',
  templateUrl: './domaine-crud-admin.component.html',
  styleUrls: ['./domaine-crud-admin.component.css']
})
export class DomaineCrudAdminComponent implements OnInit{

  showSearchInput: boolean = false;
  
 toggleSearchInput() {
   this.showSearchInput = !this.showSearchInput;
   
  }
  constructor(private _serviceAdmin: AdminService , private router: Router ,private modalService: NgbModal) {}

    listDomaine: any
    showSuccessMessage: boolean = false;
    showInfoMessage: boolean = false;
    showDangerMessage: boolean = false;


  ngOnInit(): void {

    if(this._serviceAdmin.authAdminObjet==null){
      this.router.navigate(['/admin-sidentifier'])
    }

    this._serviceAdmin.getAllDomaines().subscribe(
      resp=>{
        this.listDomaine = resp;
        console.log(this.listDomaine);
        
      }
    )
  }
  
  dataDomaine={
    nomDomaine:"",
    pathImage:"",
    descriptionDomaine:""
  }
  
  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.dataDomaine.pathImage = reader.result as string;

      };
      reader.readAsDataURL(file);
    }
  }

  onFileChangeUpdate(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.updateDomaineData.pathImage = reader.result as string;

      };
      reader.readAsDataURL(file);
    }
  }

  ajouterDomaine( fileInput : HTMLInputElement){
    this._serviceAdmin.createDomaine(this.dataDomaine).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"ajouter",
          description:"Ajouter domaine "+this.dataDomaine.nomDomaine,
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

         this.resetForm(fileInput);
        this.ngOnInit();
      }
    )
    
  }
    resetForm(fileInput: HTMLInputElement) {
    this.dataDomaine = {
      nomDomaine: '',
      pathImage: '',
      descriptionDomaine: ''
      };
      fileInput.value = '';
  }


  updateDomaineData:any=null;

  getDomainById(idDomaine:any){
    this._serviceAdmin.getDomaineById(idDomaine).subscribe(
      resp=>{
        this.updateDomaineData=resp
      }
    )
  }
 isModalVisible: boolean = false;

  updateDomaine(){
    this._serviceAdmin.updateDomaine(this.updateDomaineData.idDomaine,this.updateDomaineData).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"modifier",
          description:"Modifier domaine "+this.updateDomaineData.nomDomaine,
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

            this.modalService.dismissAll(); // Ferme tous les modals ouverts

        
        this.isModalVisible = false;
         // Show success message
        this.showInfoMessage = true;
        // Hide success message after 3 seconds
        setTimeout(() => {
          this.showInfoMessage = false;
        }, 3000);
        
        this.ngOnInit()
        
      }
    )
  }

  isFormComplete(): boolean {
  return !!this.dataDomaine.nomDomaine && !!this.dataDomaine.descriptionDomaine && !!this.dataDomaine.pathImage;
}
 
  domainToDeleteId: number;
  domainToDeleteName: string;

  // Méthode pour stocker les informations du domaine à supprimer
  setDomainToDelete(id: number, nom: string): void {
    this.domainToDeleteId = id;
    this.domainToDeleteName = nom;
  }

  deleteDomaine(idDomaine:any , nomDomaine:any){
    this._serviceAdmin.deleteDomaine(idDomaine).subscribe(
      resp=>{
        console.log(resp);

        const dataActivity={
          action:"supprimer",
          description:"Supprimer domaine "+nomDomaine,
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
