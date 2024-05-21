import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, catchError, first, flatMap, forkJoin, lastValueFrom, map, mergeMap, switchMap, tap, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private db: AngularFireDatabase,private http:HttpClient)  { }

  getConversationsForConsultant(consultantId: string): Observable<any[]> {
    return this.db.list('conversations', ref => ref.orderByChild('consultantId').equalTo(consultantId)).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const idConversation = c.key;
            const data :any= c.payload.val();
            const adminId=data.adminId;
            return { idConversation, adminId}; // Retourner l'ID et les données de la conversation
          });
        })
      );
  }

  getAdminName(adminId: string): Observable<{nomComplet: string}> {
    return this.http.get<{nomComplet: string}>(`http://localhost:8080/IsticharaConsultation/api/admin/get-nom-admin/${adminId}`);
  }

  getMessages(conversationId: string): Observable<any[]> {
    return this.db.list(`conversations/${conversationId}/messages`).valueChanges();
  }

  getAdminConversations(adminId: string): Observable<any[]> {
    return this.db.list('conversations', ref => ref.orderByChild('adminId').equalTo(adminId)).snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c => {
            const idConversation = c.key;
            const data :any= c.payload.val();
            const consultantId=data.consultantId;
            return { idConversation, consultantId}; // Retourner l'ID et les données de la conversation
          });
        })
      );
  }

  getConsultantName(consultantId: string): Observable<{nomComplet: string,imageConsultant:string}> {
    return this.http.get<{nomComplet: string , imageConsultant:string}>(`http://localhost:8080/IsticharaConsultation/api/admin/get-info-consultant/${consultantId}`);
  }

  sendMessage(conversationId: string, senderId: string, text: string , nomSender:any): Promise<any> {
    return new Promise((resolve, reject) => {
      const messageRef = this.db.list(`conversations/${conversationId}/messages`);
      const timestamp = { '.sv': 'timestamp' }; // Utilisation du ServerValue.TIMESTAMP directement depuis Firebase
      messageRef.push({ senderId, text, timestamp , nomSender})
        .then((result) => {
          resolve(result);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}
