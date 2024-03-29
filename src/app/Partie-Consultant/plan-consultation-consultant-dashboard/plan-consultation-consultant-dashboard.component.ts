import * as moment from 'moment';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  startOfDay,
  addDays,

} from 'date-fns';
import { Subject } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { EventColor } from 'calendar-utils';
import { ActivatedRoute } from '@angular/router';
import { PlanService } from '../Services/plan.service';

const colors: Record<string, EventColor> = {
  'red': {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  'blue': {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  'yellow': {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
};

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './plan-consultation-consultant-dashboard.component.html',
  styleUrls: ['./plan-consultation-consultant-dashboard.component.css']
})
export class PlanConsultationConsultantDashboardComponent implements OnInit{

  infoConsultation!:any;
  planConsultation:any;

  constructor(private modal: NgbModal,private route: ActivatedRoute,private _service:PlanService ,  private cdr: ChangeDetectorRef) {}
  ngOnInit(){    
    const id = this.route.snapshot.paramMap.get('idConsultation');
    this._service.getConsultation(id).subscribe(
      (consultation) => {
        this.infoConsultation = consultation;
        
        this.planConsultation=this.infoConsultation.plans;
        
        this.events = this.planConsultation.map((donnee : any) => {
          
          return {
            id:donnee.id,
            title: 'Event',
            start: new Date(`${donnee.dateJourDebut}T${donnee.heureDebut}`),
            end: new Date(`${donnee.dateJourFin}T${donnee.heureFin}`),
            color: { primary: '#ad2121', secondary: '#FAE3E3' },
            draggable: true,
            resizable: { beforeStart: true, afterEnd: true }
          };
        });
        this.cdr.detectChanges();

      },
      (error) => {
        console.error('Erreur lors de la récupération de la consultation:', error);
      }
    );
  }


  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } = { action: '', event: {} as CalendarEvent };

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="fas fa-fw fa-trash-alt"></i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh = new Subject<void>();

  events: CalendarEvent[] = [
    
  ];
  
  activeDayIsOpen: boolean = true;

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {
    this.events = [
      ...this.events,
      {
        title: 'event',
        start: startOfDay(new Date()),
        end: addDays(new Date(), 1),
        color: colors['red'],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ];         
  }

  deleteEvent(eventToDelete:CalendarEvent,idP:any) {
    this.events = this.events.filter((event) => event !== eventToDelete);
    
    this._service.deletePlan(idP).subscribe(
      resp=>{
        console.log(resp);
        
      }
    )
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  valide(){
    
    for (const event of this.events) {
      const donneesFormatees = this.extraireDonneesEvenement(event);
      
      this._service.addPlan(donneesFormatees).subscribe(
        resp=>{
          console.log(resp);
        }
      )
    }
  }


extraireDonneesEvenement(event: any): any {
  try {
    const dateDebut = moment(event.start);
    const dateFin = moment(event.end);

    return {      
      consultationId: this.infoConsultation.idConsultation,
      jourDebut: dateDebut.format('dddd'),
      dateJourDebut: dateDebut.format('YYYY-MM-DD'),
      jourFin: dateFin.format('dddd'),
      dateJourFin: dateFin.format('YYYY-MM-DD'),
      heureDebut: dateDebut.format('HH:mm'),
      heureFin: dateFin.format('HH:mm')
    };
  } catch (error) {
    console.error('Erreur lors de la conversion de la date', error);
  }
}

}

