import { Component,OnInit } from '@angular/core';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-statistique-consultant',
  templateUrl: './statistique-consultant.component.html',
  styleUrls: ['./statistique-consultant.component.css'],
})
export class StatistiqueConsultantComponent implements OnInit {

  constructor(public _service:ConsultantService,private router: Router){}

  rendezVous:any;

  items :any

  avis:any

  avisData :any

  ngOnInit(): void {
    if (this._service.consultantAuthObjet == null) {
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }
    
    const idConsultant=this._service.consultantAuthObjet.idConsultant
    this._service.getRendezVousStatsByIdConsultant(idConsultant).subscribe(
      data=>{
        this.rendezVous=data;
      }
    )
    
    this._service.getPlansWithStatus(idConsultant).subscribe(
      data=>{
        this.items=data;
      }
    )

    this._service.getFavAndDefavCount(idConsultant).subscribe(
      data=>{
        this.avis=data;
        this.avisData = {
          labels: ['Favorable', 'Défavorable'],
          values: [this.avis.favCount, this.avis.defavCount],
        };
      }
    )

    this._service.getActivitiesByConsultantId(this._service.consultantAuthObjet.id).subscribe(
      resp=>{
        this.listActivity=resp;
      }
    )
  }


  listActivity :any

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${month}/${day} - ${hours}:${minutes}`;
  }


}
