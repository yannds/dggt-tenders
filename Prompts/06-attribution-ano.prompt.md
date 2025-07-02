# Module Attribution & ANO — DGGT

---

## 🎯 Objectif

Gérer la commission d’attribution des marchés, l’envoi des décisions provisoires à la DGCMP, et la gestion des notifications ANO.

---

## 📁 Routes frontend

- `/attribution`  
- `/attribution/:daoId`  
- `/dgcpm/ano`

---

## 🛠 Fonctionnalités

### Commission d’attribution

- Affichage liste DAO à traiter avec statut « à attribuer »  
- Consultation des procès-verbaux (PV) de la sous-commission  
- Validation ou modification du classement des offres  
- Génération automatique de la décision provisoire (note d’attribution)  
- Envoi automatique à la DGCMP

### DGCMP

- Consultation des dossiers en attente d’ANO  
- Interface pour accepter ou refuser la décision provisoire  
- Génération et signature numérique du document ANO officiel  
- Notification automatique aux soumissionnaires concernés et au SPM

### Workflow

- Gestion paramétrable du délai standstill (temps d’attente entre décision provisoire et décision définitive)

---

## 🎨 UI/UX

- Tableaux interactifs avec filtres (DAO, date, statut) (DaisyUI)  
- Vue détaillée du dossier avec accès aux documents attachés  
- Fenêtres modales pour validations rapides et confirmations  
- Utilisation des Heroicons pour actions (valider, refuser, télécharger, notifier)  
- Design responsive, mobile-first, accessible (WCAG 2.1 AA)

---

## 🔐 Backend & données

- Modèles relationnels : Attribution (lié à PV, DAO, DGCMP), ANO (statut : accepté, refusé, en attente)  
- API REST sécurisée avec contrôle d’accès RBAC  
- Notifications push et email intégrées dans le workflow

---

## 📦 Livrable Cursor AI

- Frontend Vue 3 + Tailwind CSS + DaisyUI + Heroicons  
- Backend robuste avec API sécurisée  
- Gestion complète des états et notifications  
- Code modulaire, commenté, testable  
- Documentation utilisateur et manuel de maintenance inclus dans `/docs`

---

Souhaites-tu que je génère ce prompt en fichier `.prompt.md` prêt pour injection dans Cursor AI ou souhaites-tu un découpage par fonctionnalités ?
