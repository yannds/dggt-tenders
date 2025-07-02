# Module 11 — Observatoire Public & Statistiques

---

## 🎯 Objectif

Afficher des statistiques anonymisées sur les marchés publics accessibles au public, tout en proposant une interface complète et sécurisée pour les administrateurs afin de suivre, analyser et exporter ces données.

---

## 📁 Routes frontend

- `/observatoire-public` — portail public des statistiques anonymisées  
- `/admin/statistiques` — interface d’administration complète  

---

## 🛠 Fonctionnalités

### Observatoire Public

- Liste des marchés publics attribués ou clos  
- Filtres dynamiques : région, secteur, date, statut du marché  
- Indicateurs clés affichés (montant total attribué, répartition par type de marché, taux d’exécution, nombre de recours)  
- Visualisations graphiques interactives : histogrammes, camemberts, courbes  

### Interface Admin

- Statistiques avancées par secteur, région, état d’exécution, type de marché  
- Export des données (CSV, Excel)  
- Tableaux de bord graphiques avec alertes sur anomalies détectées (ex : variations inhabituelles)  
- Gestion des droits d’accès et audit des consultations  

---

## 🎨 UI/UX

- Design responsive, accessible (WCAG 2.1 AA)  
- Tableaux interactifs avec filtres, tri, recherche, pagination  
- Graphiques modernes (Chart.js ou D3.js) intégrés dans les dashboards  
- Utilisation de DaisyUI pour les composants et Heroicons pour les icônes  
- Notifications toast pour retours utilisateurs  

---

## 🔐 Backend & données

- Modèles de données optimisés pour les statistiques des marchés publics  
- Agrégations SQL performantes avec possibilité de cache  
- API REST sécurisée pour fournir les données statistiques  
- Historique des consultations et exports pour audit  

---

## 📦 Livrable Cursor AI

- Frontend modulaire en Vue 3 + Tailwind CSS + DaisyUI + Heroicons  
- Backend API REST robuste et documenté  
- Code propre, commenté, avec manuel utilisateur et maintenance dans `/docs`  
