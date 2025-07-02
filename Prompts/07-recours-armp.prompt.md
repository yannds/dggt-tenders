# Module 07 — Recours, ARMP et Contentieux — DGGT

---

## 🎯 Objectif

Permettre aux soumissionnaires de déposer des recours, gérer les décisions de l’ARMP, et suivre les dossiers contentieux DGGT.

---

## 📁 Routes frontend

- `/recours/create/:daoId` — dépôt de recours par soumissionnaire  
- `/recours` — suivi des recours par soumissionnaire  
- `/armp/recours` — gestion ARMP des recours  
- `/contentieux` — gestion contentieux DGGT  

---

## 🛠 Fonctionnalités

### Soumissionnaire

- Formulaire de dépôt de recours avec :  
  - Motif  
  - Upload multiple de pièces justificatives (PDF, images, DOCX)  
- Suivi en temps réel du statut du recours :  
  - En cours  
  - Accepté  
  - Rejeté  
  - Suspendu  
- Notifications push/toast sur changement de statut

### ARMP

- Liste filtrable et paginée des recours à traiter  
- Prise de décision officielle : acceptation, rejet, suspension  
- Ajout de commentaires et motifs  
- Envoi automatique de notifications aux soumissionnaires concernés

### Contentieux DGGT

- Gestion centralisée des dossiers suspendus  
- Suivi détaillé et archivage des décisions judiciaires  
- Interface de consultation historique complète

---

## 🎨 UI/UX

- Formulaires avec validation et upload fichiers multiples (DaisyUI file-input)  
- Tableaux dynamiques avec filtres et recherche (DaisyUI table)  
- Notifications temps réel (toast) et confirmations  
- Utilisation des Heroicons pour actions (upload, accepter, rejeter, commenter)  
- Design responsive, accessible (WCAG 2.1 AA), mobile-first

---

## 🔐 Backend & données

- Modèles : Recours, Décision ARMP, Dossier Contentieux  
- Historique complet des échanges et décisions avec audit des actions (qui, quand, quoi)  
- API REST sécurisée avec contrôle d’accès RBAC strict  
- Stockage sécurisé des documents justificatifs  
- Notifications push/email intégrées

---

## 📦 Livrable Cursor AI

- Frontend Vue 3 + Tailwind CSS + DaisyUI + Heroicons, testable et modulaire  
- Backend API REST robuste avec règles métier complexes et audit complet  
- Code commenté, modulaire, facile à maintenir  
- Documentation utilisateur et manuel de maintenance générés automatiquement dans `/docs`

---

Veux-tu que je génère ce prompt complet en `.prompt.md` prêt à être injecté dans Cursor AI, ou un découpage en plusieurs prompts plus petits pour chaque profil/utilisateur ?
