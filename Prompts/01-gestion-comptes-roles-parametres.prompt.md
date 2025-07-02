# Module 01 — Gestion des comptes, rôles, paramètres système & Soumission des Offres

---

## 🎯 Objectifs principaux

### Gestion des comptes, rôles et paramètres système
- Créer un module d’administration complet accessible via `/admin` pour gérer :
  - Utilisateurs : création, modification, désactivation, suppression
  - Rôles et privilèges : définir les accès (Admin, Caisse, Finances, SPM, CAF, DGGT, Soumissionnaire, ARMP, DGCMP)
  - Paramètres globaux système : standstill, régions, types d’appels d’offres, secteurs, taux d’acomptes, pagination

### Soumission des offres
- Permettre aux soumissionnaires d’envoyer leurs offres techniques et financières, avec validation, verrouillage et traçabilité, uniquement sur DAO achetés

---

## 📁 Routes frontend à générer

### Administration
- `/admin/accounts` — liste des utilisateurs avec actions (ajout, édition, suppression)
- `/admin/accounts/create` — formulaire création utilisateur
- `/admin/accounts/:id/edit` — édition utilisateur
- `/admin/roles` — gestion des rôles et privilèges avec toggles
- `/admin/config` — configuration paramètres globaux

### Soumissionnaire
- `/soumissionnaire/dao` — liste DAO achetés disponibles pour soumission
- `/soumissions/create/:daoId` — formulaire complet de soumission
- `/soumissionnaire/mes-soumissions` — suivi lecture seule des soumissions envoyées
- `/soumissions/:id/view` — vue détaillée de la soumission (admin et DGGT)

---

## 🛠 Fonctionnalités détaillées

### Gestion des comptes et rôles

- **Utilisateurs** :
  - Données : nom, prénom, email, rôle(s), statut actif/inactif, fonction
  - Validation forte : email correct, mot de passe minimum 8 caractères, chiffres, majuscules
  - Désactivation possible sans suppression
  - L’admin ne peut modifier ni supprimer son propre rôle
- **Rôles & privilèges** :
  - Liste dynamique des rôles, ajout possible
  - Gestion fine des privilèges : CRUD DAO, gestion soumissionnaires, accès statistiques, etc.
- **Paramètres globaux** :
  - Standstill (nombre entier de jours)
  - Régions & secteurs dynamiques
  - Types appels d’offres (AMI, AO, AAO)
  - Taux d’acompte par défaut, TVA, etc.

---

#### Page Gestion des droits / Rôles

- **Liste des rôles et droits existants :**  
  - Afficher dans un tableau ou une liste tous les rôles définis dans le système (ex: Administrateur, dggt, caf, ct, financiers, Soumissionnaire, CAF, CT, CMPR, etc.)  
  - Colonnes :  
    - **Nom du rôle** : Nom clair et lisible (ex: "Administrateur")  
    - **Description** : Brève description des responsabilités associées à ce rôle  
    - **Droits associés** : Présentation des droits spécifiques liés à chaque rôle, affichés avec des icônes ou des codes couleurs pour faciliter la compréhension visuelle  
    - **Actions** : Boutons ou liens pour modifier ou supprimer le rôle directement depuis la liste  
- Modifier rapidement les droits via toggles ou boutons dans la même interface  

### Soumission des offres

- Affichage clair du DAO ciblé avec critères et deadline
- Formulaire multi-sections :
  - Offre technique (éditeur texte + upload PDF/Word)
  - Offre financière (tableau bordereau des prix dynamique)
  - Planning exécution
  - Personnel & matériel avec uploads justificatifs (CV, attestations)
- Validation en temps réel, alertes et blocage avant envoi si erreurs
- Une seule soumission possible par DAO/soumissionnaire
- Verrouillage du formulaire après soumission, passage en lecture seule
- Accusé réception horodaté avec trace IP utilisateur
- Upload sécurisé, API REST avec authentification JWT

---

## 🎨 UI/UX & Tech Stack

- **DaisyUI** pour composants (forms, modals, alerts, toasts, file-input, steps)
- **Heroicons** pour icônes (upload, verrouillage, validation)
- Responsive, accessible (WCAG 2.1 AA), design Material / flat, identité DGGT
- Séparation claire : UI, logique métier, gestion d’état (Pinia)
- Notifications toast pour succès/erreur
- Sidebar et header global admin
- Modales pour création/édition rapides avec possibilité pages dédiées

---

## 🧱 Backend & données

- Modèles : `User`, `Role`, `Parameter`, `Soumission`, `DAO`
- Relations claires entre utilisateurs, soumissions et DAO
- API REST sécurisée avec contrôle d’accès strict
- Authentification JWT + gestion sessions
- Stockage fichiers organisé par DAO et soumissionnaire
- Validation serveur forte

---

## 📦 Livrables Cursor AI attendus

- Composants Vue 3 :
  - `UserList.vue`, `UserForm.vue`, `RoleManager.vue`, `SystemConfig.vue`
  - `SoumissionForm.vue`, `SoumissionList.vue`, `SoumissionDetail.vue`, `UploadSection.vue`
- Backend :
  - Services et contrôleurs `user.service.ts`, `soumission.service.ts` etc.
- Tests unitaires basiques (validation formulaire, sécurité)
- Style Tailwind CSS + DaisyUI + Heroicons configuré
- Documentation utilisateur et technique complète dans `/docs`

---

## 📘 Notes complémentaires

- Interface admin avec sidebar escamotable, menu utilisateur, header/footer DGGT
- Prévoir un watcher/déclencheur automatique pour verrouiller soumissions après date limite
- Conformité RGPD et sécurité renforcée (validation des uploads, audit)
- Code commenté et maintenable

