import { Component, OnInit } from '@angular/core';
import { DomaineService } from '../Services/domaine.service';
import { domaineBeans } from '../Beans/DomaineBean';

@Component({
  selector: 'app-accueil-utilisateur',
  templateUrl: './accueil-utilisateur.component.html',
  styleUrls: ['./accueil-utilisateur.component.css']
})
export class AccueilUtilisateurComponent implements OnInit{
  
  constructor(private _serviceDomaine:DomaineService){}

  domaines:domaineBeans[]=[]


  ngOnInit(): void {
    this._serviceDomaine.getAllDomaine().subscribe(
      resp=>{
        this.domaines=resp;
      }
    )
  }

  faqList = [
    {
      "question": "Qu'est-ce que ISTICHARA ?",
      "answer": "Istichara est une plateforme en ligne au Maroc qui connecte les clients avec des consultants experts dans divers domaines",
      "open": false
    },
    {
      "question": "Comment fonctionne ISTICHARA ?",
      "answer": "ISTICHARA simplifie la recherche de consultants en fournissant une interface conviviale pour explorer les profils, réserver des consultations en ligne, et bénéficier de conseils professionnels.",
      "open": false
    },
    {
      "question": "Quels domaines d'expertise sont couverts sur ISTICHARA?",
      "answer": "ISTICHARA couvre une variété de domaines tels que Santé, Technologie, Education, avec des consultants qualifiés dans chaque discipline.",
      "open": false
    },
    {
      "question": "Comment puis-je réserver une consultation en ligne ?",
      "answer": "Utilisez notre interface conviviale pour parcourir les consultants, sélectionner un créneau horaire disponible et réserver votre consultation en quelques clics.",
      "open": false
    },
    {
      "question": "Qu'est-ce que l'option de consultation urgente ?",
      "answer": "L'option de consultation urgente vous permet d'obtenir des réponses de consultants dans les 24 heures suivant votre réservation, idéale pour des situations nécessitant une réponse rapide.",
      "open": false
    },
    {
      "question": "Comment sont sélectionnés les consultants sur ISTICHARA ?",
      "answer": "Les consultants sur Istichara sont rigoureusement sélectionnés pour leur expertise et leurs qualifications dans leur domaine respectif.",
      "open": false
    },
    {
      "question": "Quelle est la tarification des consultations sur ISTICHARA ?",
      "answer": "La tarification des consultations varie en fonction du consultant et du domaine d'expertise. Les détails de la tarification sont clairement indiqués sur les profils des consultants.",
      "open": false
    },
    {
      "question": "Quelles sont les options de paiement disponibles sur ISTICHARA ?",
      "answer": "ISTICHARA propose des options de paiement sécurisées pour assurer des transactions sans tracas. Vous pouvez effectuer le paiement en utilisant Visa, MasterCard.",
      "open": false
    },
    {
      "question": "Comment puis-je contacter le support client ISTICHARA ?",
      "answer": "Pour contacter notre support client, veuillez utiliser notre formulaire de contact en ligne disponible sur le site. Nous nous engageons à répondre dans un délai maximum de 48 heures pour vous assister.",
      "open": false
    }
  ];

  toggleAnswer(faq: any) {
    faq.open = !faq.open;
  }
}
