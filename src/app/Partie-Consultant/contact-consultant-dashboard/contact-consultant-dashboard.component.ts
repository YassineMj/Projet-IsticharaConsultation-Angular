import { Component,ViewChild, ElementRef, AfterViewChecked  } from '@angular/core';
import { ChatService } from '../Services/chat.service';
import { ConsultantService } from '../Services/consultant.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-consultant-dashboard',
  templateUrl: './contact-consultant-dashboard.component.html',
  styleUrls: ['./contact-consultant-dashboard.component.css']
})
export class ContactConsultantDashboardComponent {

   @ViewChild('messageContainer') private messageContainer: ElementRef;
  constructor(public _serviceConsultant:ConsultantService,private _serviceChat:ChatService,private router:Router){}

  conversations: any[] = [];
  messages:any;
  text:string='';
  activeChat:boolean=false;
  conversation:any

  ngOnInit():void{
    if (this._serviceConsultant.consultantAuthObjet == null) {
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }

    this._serviceChat.getConversationsForConsultant(this._serviceConsultant.consultantAuthObjet.idFireBase).subscribe(
      resp=>{
        this.conversations=resp;
        this.conversations.forEach(conversation => {
          this._serviceChat.getAdminName(conversation.adminId).subscribe(admin => {
            conversation['nomAdmin'] = admin.nomComplet;
            conversation['nomConsultant'] = this._serviceConsultant.consultantAuthObjet.nom+' '+this._serviceConsultant.consultantAuthObjet.prenom;
          });

        });
          
        console.log(this.conversations);
        
      }
    )
  }

   scrollToBottom(): void {
    try {
      this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
    } catch(err) { }
  }

  getChat(idConversation:any){
    this._serviceChat.getMessages(idConversation).subscribe(
      resp=>{
        this.messages=resp
        this.conversation=idConversation;
        this.activeChat=true;
        console.log('messages :'+this.messages);
        
      },
      error=>{
        console.log("aucun message");
        this.activeChat=false;

      }
    )
    
  }

  sendMessage() {
    if (this.text.trim() !== '') {
      this.scrollToBottom();
      this._serviceChat.sendMessage(this.conversation, this._serviceConsultant.consultantAuthObjet.idFireBase, this.text, this._serviceConsultant.consultantAuthObjet.nom + ' ' + this._serviceConsultant.consultantAuthObjet.prenom)
        .then(() => {
          console.log('Message envoyé avec succès');
          // Effacer le champ de saisie après l'envoi du message
          this.text = '';
          // Rafraîchir la liste des messages après l'envoi du message
          this.getChat(this.conversation);
        })
        .catch((error) => {
          console.error('Erreur lors de l\'envoi du message:', error);
        });
      console.log(this.conversation);
    
    }
  }
     ngAfterViewChecked() {
    // After Angular checks the component's views, scroll to the bottom
    this.scrollToBottom();
  }

  isChatVisible: boolean = false;

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }
  
}
