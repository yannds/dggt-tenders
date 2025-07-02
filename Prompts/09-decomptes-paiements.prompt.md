# Module 10 — Décomptes, Validation & Paiements — DGGT

---

## 🎯 Objectif

Gérer l’ensemble du processus financier lié aux marchés publics : création, validation des décomptes, génération de factures et suivi des paiements.

---

## 📁 Routes frontend

- `/decomptes/create/:marcheId` — création de décompte  
- `/decomptes` — liste et gestion des décomptes  
- `/paiements` — gestion des paiements en cours  
- `/paiements/historique` — historique complet des paiements  

---

## 🛠 Fonctionnalités

- Création et soumission des décomptes financiers par soumissionnaire ou SPM  
- Validation obligatoire des décomptes par DGGT (CAF, SPM) avec notifications  
- Calcul automatique des acomptes, retenues et TVA selon paramètres configurés  
- Génération automatique des factures liées aux paiements (TTC/HT)  
- Suivi en temps réel des paiements : statut, montants versés, dates, mode (cash, Mobile Money, CB)  
- Historique exhaustif des paiements par marché avec possibilité d’export  

---

## 🎨 UI/UX

- Formulaires interactifs avec calculs en temps réel (montants, taxes, retenues)  
- Tableaux de bord financiers avec filtres, tri, et recherche avancée  
- Notifications toast automatiques pour validation et mise à jour des paiements  
- Design responsive, accessible (WCAG 2.1 AA)  
- Composants DaisyUI (form, table, alert, modal) et Heroicons  

---

## 🔐 Backend & données

- Modèle `Decompte` lié à un marché et soumissionnaire  
- Modèle `Paiement` avec statut, mode de paiement, date, montant  
- API REST sécurisée, intégrée à un système comptable via API externe (prévoir extension)  
- Gestion fine des droits d’accès et audit des opérations  

---

## 📦 Livrable Cursor AI

- Frontend Vue 3 + Tailwind CSS + DaisyUI + Heroicons, modulaire, maintenable et testé  
- Backend API REST performant, sécurisé et extensible  
- Code commenté et manuel utilisateur & maintenance dans `/docs`  
