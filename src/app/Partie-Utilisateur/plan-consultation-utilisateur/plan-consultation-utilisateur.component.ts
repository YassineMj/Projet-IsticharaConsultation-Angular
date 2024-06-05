import * as moment from 'moment';
import { interval, takeUntil } from 'rxjs';

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
  startOfWeek,
  endOfWeek,
  isWithinInterval,

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
import { ActivatedRoute, Router } from '@angular/router';
import { PaiementService } from '../Services/paiement.service';

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
  
    .btn-disabled {
    pointer-events: none;  /* Prevents click events */
    opacity: 0.5;          /* Makes the button look disabled */
    cursor: not-allowed;   /* Changes cursor to not-allowed */
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

  constructor(private _servicePlan: PaiementService,private router: Router,  private cdr: ChangeDetectorRef) {}
  ngOnInit(){   

    this.events = this.planConsultation.map((donnee : any) => {
          
      return {
        id:donnee.id,
        title: '',
        start: new Date(`${donnee.dateJourDebut}T${donnee.heureDebut}`),
        end: new Date(`${donnee.dateJourFin}T${donnee.heureFin}`),
        color: { primary: '#ff71716a', secondary: '#ff71716a' },
        draggable: false,
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


  showAlertwarning: boolean = false;
  showAlertdanger: boolean = false;
  alertTitle: string = '';
  alertMessage: string = '';


  showAlertMessagew(title: string): void {
  this.alertTitle = title;
  this.showAlertwarning = true;
  // Create an observable that emits every 3 seconds
  const hideAlert$ = interval(1000);
  // Create a subject to signal completion
  const unsubscribe$ = new Subject<void>();
  // Combine hideAlert$ and unsubscribe$ to hide after 3 seconds
  hideAlert$.pipe(
    takeUntil(unsubscribe$)
  ).subscribe(() => {
    this.showAlertwarning = false;
    unsubscribe$.next(); // Complete the subject
    unsubscribe$.complete();
  });
}

  closeAlertw(): void {
    this.showAlertwarning = false;
  }

  showAlertMessaged(title: string): void {
    this.alertTitle = title;
    this.showAlertdanger = true;

    setTimeout(() => {
    this.showAlertdanger = false;
    }, 3000);
    
  }

  closeAlertd(): void {
    this.showAlertdanger = false;
  }

  handleEvent(event: CalendarEvent): void {
    if (event.start.getTime() < Date.now()) {
      this.showAlertMessagew('Le temps est terminé');
      return;
    }

    this._servicePlan.checkRendezVous(event.id).subscribe(resp => {
      if (resp.accepteTrueFound) {
        this.router.navigate(['/utilisateur/infos-utilisateur', event.id]);
      } else {
        this.showAlertMessaged('Le rendez-vous a déjà été réservé pour quelqu\'un d\'autre');
      }
    });
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }


    isCurrentWeek(date: Date): boolean {
    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    return isWithinInterval(date, { start, end });
  }
  
}


