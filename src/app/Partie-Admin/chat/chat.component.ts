import { Component } from '@angular/core';
import { AdminService } from '../Services/admin.service';
import { Router } from '@angular/router';
import { ChatService } from 'src/app/Partie-Consultant/Services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  constructor(public _serviceAdmin:AdminService,private _serviceChat:ChatService,private router:Router){}

  conversations: any[] = [];
  messages:any;
  text:string='';
  activeChat:boolean=false;
  conversation:any

  ngOnInit():void{
    if (this._serviceAdmin.authAdminObjet == null) {
      this.router.navigate(['/consultant/sidentifier-consultant']);
    }

    this._serviceChat.getAdminConversations(this._serviceAdmin.authAdminObjet.idFireBase).subscribe(
      resp=>{
        this.conversations=resp;
        this.conversations.forEach(conversation => {
          this._serviceChat.getConsultantName(conversation.consultantId).subscribe(consultant => {
            conversation['nomAdmin'] = this._serviceAdmin.authAdminObjet.nomComplet;
            conversation['nomConsultant'] = consultant.nomComplet;
            conversation['imageConsultant'] = consultant.imageConsultant;

          });

        });
          
        console.log(this.conversations);
        
      }
    )
  }

  imageConsultantChat:any;
  getChat(idConversation:any , imageConsultant:any){
    this._serviceChat.getMessages(idConversation).subscribe(
      resp=>{
        this.imageConsultantChat=imageConsultant;
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

  sendMessage(){
    this._serviceChat.sendMessage(this.conversation,this._serviceAdmin.authAdminObjet.idFireBase,this.text,this._serviceAdmin.authAdminObjet.nomComplet)
    .then(() => {
      console.log('Message envoyé avec succès');
      // Effacer le champ de saisie après l'envoi du message
      this.text = '';
      // Rafraîchir la liste des messages après l'envoi du message
      //this.getChat(this.conversation);
    })
    .catch((error) => {
      console.error('Erreur lors de l\'envoi du message:', error);
    });
    console.log(this.conversation);
    
  }


}
