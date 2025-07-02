# Module 09 — Suivi de projet & Attachements — DGGT

---

## 🎯 Objectif

Permettre le téléversement, la gestion et la consultation sécurisée des documents liés aux projets (PAC, PV de chantier, rapports, devis, etc.).

---

## 📁 Routes frontend

- `/suivi-projet` — interface DGGT (SPM, CAF, Admin)  
- `/attachements` — administration des documents  
- `/soumissionnaire/attachements` — consultation et upload soumissionnaire  

---

## 🛠 Fonctionnalités

### Soumissionnaire

- Upload facile et sécurisé via interface drag & drop  
- Téléversement de PV de chantier, devis quantitatifs, rapports, PAC  
- Consultation des documents soumis, accès en lecture seule  

### DGGT (SPM, CAF, Admin)

- Consultation complète des documents classés par projet/marché  
- Téléchargement des fichiers  
- Recherche et filtrage avancé par type, date, projet  
- Validation des documents ou demande de compléments  

### Administration

- Vue globale et liste exhaustive des attachements  
- Statistiques de complétude et indicateurs par projet/marché  

---

## 🎨 UI/UX

- Design responsive, accessible (WCAG 2.1 AA)  
- Composants DaisyUI : drag & drop file upload, tables dynamiques, modales  
- Heroicons pour actions : upload, download, filtre, validation  
- Notifications toast pour succès, erreurs et demandes  

---

## 🔐 Backend & données

- Modèle `Attachment` avec métadonnées : type, date, marché lié, soumissionnaire  
- Stockage sécurisé (cloud/local configurable) des fichiers  
- API REST performante et sécurisée pour gestion de gros volumes  
- Contrôle d’accès RBAC selon profils utilisateurs  

---

## 📦 Livrable Cursor AI

- Frontend Vue 3 + Tailwind CSS + DaisyUI + Heroicons, modulaire et testable  
- Backend API REST robuste, scalable, sécurisé  
- Code commenté, maintenable, et manuel d’utilisation + maintenance dans `/docs`  
