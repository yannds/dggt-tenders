# 📝 Product Requirements Document (PRD) — Application DGGT

## 🎯 Contexte
La Délégation Générale aux Grands Travaux(DGGT), Entité publique de la Republique du Congo, dirigé par un Délégué Général, est le maître d’ouvrage délégué pour les projets :
- > 2 milliards XAF (Travaux)
- > 500 millions XAF (Services / Consultants)

## 📚 Objectifs Fonctionnels
Créer une application web centralisée pour la gestion des marchés publics :
- Conforme au Code des Marchés Publics congolais de 2009
- Sécurisée (ZTNA, chiffrement, AIP, DLP, IAM avancé)
- Accessible via navigateur et mobile
- Compatible GED / ERP / SSO / Signature électronique
- Créer une interface unique de gestion des marchés publics
- Gérer tous les cycles : publication, soumission, dépouillement, attribution, exécution
- Offrir une visibilité publique via un observatoire en ligne
- Garantir traçabilité, auditabilité et conformité juridique

## 🧩 Modules Clés

# PRD détaillé pour Cursor AI — Gestion Marchés Publics DGGT (avec attachements, décomptes, évaluation, attribution et administration)

---
## 0. Cycle de vie des DAO

1. Élaboration des Plans de Passation des Marchés (PPM)
2. Création et publication des DAO
3. Achat des DAO par les soumissionnaires
4. Soumission des offres (formulaire + pièces)
5. Dépouillement des offres (affichage nom, prix, date, utilisateur)
6. Évaluation technique (auto scoring + ajustement manuel)
7. PV de sous-commission signé
8. Attribution provisoire par commission d’attribution
9. Validation par DGCMP (ANO)
10. Standstill (délai de contestation)
11. Attribution définitive
12. Gestion contentieux / recours
13. Suivi des projets, attachements, PAC, PV
14. Décomptes et paiements
15. Observatoire et statistiques publiques
16. Audit & sécurité (logs, conformité ISO 27001)

## 0. Gestion des comptes, privilèges et paramètres globaux (Admin)

- Module administration centralisée  
- Gestion des utilisateurs : création, modification, suppression, rôle, permissions (RBAC)  
- Gestion des rôles standards : Admin DGGT, SPM, CAF, Soumissionnaire, ARMP, DGCMP, Sous-commission, Commission d’attribution  
- Page de configuration générale (paramètres globaux) :  
  - Paramètres Standstill (durée, notifications)  
  - Gestion des régions géographiques  
  - Types d’appels d’offres (AMI, AAO, DAO, etc.)  
  - Domaines ou secteurs d’activité  
  - Pourcentage (taux divers pour décomptes, pénalités, avances…)  
  - Autres paramètres administratifs  
- API CRUD pour comptes, rôles, paramètres  
- Interface dédiée sécurisée Admin  

---

## 1. Élaboration des PPM (Plans de Passation des Marchés) validés par DGCMP

- Modèle PPM avec champs : année, version, statut (brouillon, soumis, validé, rejeté), liste des projets  
- Modèle projet avec : intitulé, catégorie, mode passation, date estimée, montant estimé  
- API CRUD pour PPM et soumission à DGCMP  
- Interface DGGT : liste, création, édition, soumission PPM  
- Interface DGCMP : consultation, validation/rejet/commentaire PPM  
- Interface publique : consultation PPM validés  
- Notifications à chaque étape  
- Workflow strict de validation  

---

## 2. Module DAO (Appels d’Offres)

- Modèle DAO détaillé :  
  - Informations générales : titre, numéro, entité responsable, lieu, dates publication & clôture, prix DAO, description  
  - Statuts : brouillon, publié, clos, attribué provisoirement, attribué définitivement, annulé  
  - Champs WYSIWYG : TDR, CCTP, CCAG  
  - Pièces jointes : téléversement multiples (PDF, Word, Excel, plans…), fichiers associés dynamiques  
  - Sections extensibles :  
    - Personnel requis (intitulé poste, quantité, preuves téléversées - CV, diplômes)  
    - Matériel requis (intitulé, type, quantité, fiche technique)  
  - Critères d’évaluation :  
    - Méthode (combo box éditable)  
    - Liste critères (intitulé, coefficient, quantité minimale)  
- API CRUD DAO, fichiers, statuts, critères  
- Interface DGGT admin (listes, formulaires pages dédiées, gestion statuts)  
- Interface publique (liste DAO, page détail sans montant estimé)  
- Bouton **« Acheter DAO »** visible uniquement si DAO payant & non acheté (après authentification)  
- Gestion accès documents sécurisée selon rôles  

---

## 3. Soumission des offres

- Modèle réponse aux DAO :  
  - Réponses dynamiques aux critères DAO  
  - Téléversement documents d’offre technique, financière et preuves  
  - Verrouillage total après dépôt  
- API CRUD réponses, verrouillage  
- Interface soumissionnaire :  
  - Liste DAO achetés  
  - Formulaire réponse (dynamiques, sécurisé)  
  - Visualisation offres en lecture seule post dépôt  
- Interface DGGT/SPM/admin :  
  - Consultation offres en lecture seule  

---

## 4. Dépouillement

- Interface sous-commission :  
  - Liste DAO à dépouiller  
  - Consultation offres reçues (tri, filtre, pièces jointes)  
- Lecture seule, pas de modification possible  

---

## 5. Évaluation technique (Sous-commission)

- Auto scoring basé sur critères et coefficients  
- Formulaire évaluation modifiable manuellement  
- Classement automatique + ajustements manuels  
- Génération PV de la sous-commission (rapport officiel signé)  
- API gestion notes, classement, rapport  
- Notifications aux acteurs concernés  

---

## 6. Attribution (Grande commission + DGCMP)

- Grande commission :  
  - Consultation rapports sous-commission  
  - Validation ou modification classement  
  - Décision d’attribution provisoire  
  - Envoi décision à DGCMP pour ANO (Approbation Notification d’Ordre)  
- DGCMP :  
  - Validation/rejet ANO  
- En cas de rejet ANO :  
  - Mise en standstill (durée paramétrable) en attente de réclamation/règlement  
- Publication résultats sur portail public  
- Gestion notifications et mises à jour statut DAO  

---

## 7. Réclamations, recours ARMP, contentieux

- Modèle et workflow réclamations  
- Interface dépôt et suivi réclamations par soumissionnaire  
- Interface gestion DGGT, ARMP : traitement, décisions, clôture  
- Suspension DAO et gestion contentieux  

---

## 8. Suivi de projet

- Gestion attachements projet : PV, PAC, rapports, devis, factures associées  
- Téléversements par soumissionnaires, validation DGGT  
- Notifications sur échéances et événements importants  

---

## 9. Décomptes, validation, facturation et paiements

- Saisie décomptes par soumissionnaires  
- Validation par CAF et DGGT  
- Calcul automatique TTC/HT, taux, pénalités  
- Génération automatique factures selon décomptes validés  
- Intégration API ERP & système de paiement  
- Interface suivi factures et paiements pour finance et DGGT  

---

## 10. Suivi budgétaire

- Visualisation budgets alloués, consommés, restant  
- Prévisions annuelles et alertes sur dépassements  
- Tableaux de bord analytiques pour administration  
- Export et rapports  

---

## 11. Gestion des rôles, accès et sécurité

- Rôles :  
  - Admin DGGT (gestion complète)  
  - SPM (services projets marchés)  
  - CAF (contrôle financier)  
  - CT (PPM, Decomptes, Attachements, Suivi de projets)
  - CMPR (PPM, services projets marchés, decomptes)
  - Soumissionnaires  
  - ARMP (régulateur marchés)  
  - DGCMP (contrôle supérieur)  
  - Sous-commission d’évaluation  
  - Grande commission d’attribution  
- RBAC complet  
- Contrôle accès strict à chaque module et données  
- Journalisation / audit complet  

Utilisateurs et Rôles

| Rôle            | Description                                    | Droits principaux                                               |
|-----------------|-----------------------------------------------|----------------------------------------------------------------|
| Administrateur  | Gestion globale, gestion utilisateurs, audit | Gestion comptes, rôles, paramètres, accès complet               |
| DGGT            | Gestion des DAO, suivi projet                  | Création DAO, suivi, validation, accès complet                  |
| SPM             | Suivi technique, evaluation, depouillement    | Dépouillement, évaluation, gestion des soumissions              |
| CAF             | Gestion financière, facturation                | Décomptes, génération factures, validation paiements            |
| Soumissionnaire | Soumission des offres                           | Achat DAO, dépôt offres, consultation résultats                 |
| DGCMP           | Validation des PPM et ANO                       | Validation PPM, ANO, suivi décisions                             |
| ARMP            | Gestion des recours                             | Gestion contentieux, avis, décisions                             |

---

## 12. Statistiques et observatoire public

- Observatoire public :  
  - Liste des marchés publics, statistiques générales  
  - Indicateurs de performance  
  - Export CSV/Excel  
- Tableau de bord interne :  
  - Statistiques avancées  
  - Suivi des performances  
  - Alertes et notifications personnalisées  

---

# Notes générales et recommandations pour Cursor AI
 
- **Synchronisation parfaite frontend/backend** pour données et états.  
- **Validation stricte** des règles métier à chaque étape.  
- **Gestion d’erreurs et logs** détaillés pour débogage.  
- Utilisation recommandée d’une stack moderne : React + TypeScript + Tailwind CSS pour frontend ; Node.js + Express pour backend.  
- Architecture API-centric modulaire et scalable.  
- Fourniture de tests unitaires et d’intégration automatisés.  
- Documentation complète (README, PRD, tasks).  
- Découpage en sous-prompts détaillés, indépendants et réutilisables.  
- Gestion avancée des notifications et workflow pour acteurs.  

---

