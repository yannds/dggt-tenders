# 📦 Module 03 — DAO : Création, publication, consultation, achat

## 🎯 Objectif
Permettre la création, la gestion, la publication et la consultation publique de DAO (Dossiers d'Appel d'Offres), avec possibilité d'achat sécurisé par les soumissionnaires.

Ce module est visible :
- côté **admin** (pour la gestion complète)
- côté **portail public** (consultation, achat)

---

## 📁 Routes frontend

- `/dao` : tableau de bord DAO (admin)
- `/dao/create` : création DAO
- `/dao/:id/edit` : modification DAO
- `/dao-public` : liste publique des DAO valides
- `/dao/:id` : page publique détaillée d’un DAO
- `/soumissionnaire/dao/:id/acheter` : page d’achat du DAO

---

## 🧩 Fonctionnalités détaillées

### 🔨 Création & Édition DAO (admin)
- Formulaire multicomposant (WYSIWYG + champs dynamiques)
- Champs :
  - Titre, référence, entité responsable
  - Type de marché, catégorie, lieu d’exécution (liste dynamique)
  - Dates (publication, clôture, dépouillement)
  - Prix d’acquisition DAO (obligatoire si payant)
  - Montant estimé (⚠️ non affiché au public)
  - Éditeur WYSIWYG pour TDR, CCTP, CCAG
  - Critères d’évaluation pondérés (la somme doit faire 100%)
  - Personnel requis (nom, fonction, justificatif en pièce jointe)
  - Matériel requis (type, quantité, preuve si requis)
  - Lots (n-uple extensible), description + fichiers

### 🛒 Achat DAO (soumissionnaire connecté)
- Vérification si déjà acheté
- Si oui → accès aux documents à télécharger
- Si non → bouton “Acheter” :
  - Génère une **facture PDF**
  - Débloque l'accès aux pièces téléchargeables

### 🌐 Portail public (`/dao-public`)
- Liste des DAO publiés uniquement
- Filtres :
  - Type de marché, entité, date de clôture, gratuit/payant, région
- Affichage :
  - Cartes DAO (titre, date clôture, statut, bouton `voir plus`)
  - Détail complet du DAO sur `/dao/:id`

---

## 🛠 Backend & modèle de données

- 🔐 API REST sécurisée (authentification + rôles)
- 📦 Modèles :
  - `Dao`, `CritereEvaluation`, `Lot`, `Personnel`, `Materiel`
  - `AchatDao`, `Facture`, `LieuExecution`, `TypeMarche`, `Categorie`
- 🗂 Stockage :
  - Upload multi-fichiers DAO (PDF, Word, Excel)
  - Stockage cloud ou local selon config
- 🔍 Historique des actions (logs auditables)

---

## 🖥 UI/UX

- Vue 3 + Tailwind CSS + DaisyUI
- Icônes via Heroicons (document, plus-circle, cloud-arrow-down, shopping-cart)
- Responsive design mobile/tablette
- Design institutionnel DGGT (Flat + Material)
- Validation dynamique :
  - Dates logiques
  - Pondération = 100%
  - Champs obligatoires visuellement indiqués

---

## 📦 Composants à générer

- `DaoForm.vue`
- `DaoCard.vue`
- `DaoList.vue`
- `LotRepeater.vue`
- `CritereEditor.vue`
- `AcheterDao.vue`
- `FactureGenerator.vue`

---

## ✅ Tests & Sécurité

- Tests unitaires sur la validation formulaire
- Séparation logique/API/UI
- Authentification JWT ou Session
- Export PDF des DAO & factures
- Conforme à ISO 27001 : intégrité, contrôle d’accès, traçabilité

---

## 📘 Manuel & documentation

- Génère automatiquement un manuel dans `/docs/dao.md` :
  - Ajout/modif DAO
  - Règles de validation
  - Processus d’achat
  - Publication automatique
  - Gestion sécurisée des pièces jointes
