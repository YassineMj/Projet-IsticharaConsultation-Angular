import * as moment from 'moment';

import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef,
  OnInit,
  ChangeDetectorRef,
  Input,
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
  selector: 'app-plan-consultation-utilisateur',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [
    `
    .scrollable-container {
    height: 300px; /* ou toute autre hauteur souhaitée */
    overflow-y: auto; /* Activer le défilement vertical si nécessaire */
  }
  
      h3 {
        margin: 0 0 10px;
      }

      pre {
        background-color: #f5f5f5;
        padding: 15px;
      }
    `,
  ],
  templateUrl: './plan-consultation-utilisateur.component.html',
})
export class PlanConsultationUtilisateurComponent implements OnInit{

  @Input() planConsultation:any;

  constructor(private modal: NgbModal,private route: ActivatedRoute,  private cdr: ChangeDetectorRef) {}
  ngOnInit(){   

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
  }


  @ViewChild('modalContent', { static: true }) modalContent!: TemplateRef<any>;


  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  } = { action: '', event: {} as CalendarEvent };


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


  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}


