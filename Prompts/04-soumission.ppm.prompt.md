# 🧾 Module 04 — Soumission des Offres

## 🎯 Objectif
Permettre aux **soumissionnaires** de déposer leurs offres techniques et financières après achat validé du DAO, dans un espace sécurisé, avec une structure conforme aux exigences du Code des Marchés Publics.

---

## 🧩 Pages / Routes frontend

- `/soumissionnaire/dao` : liste des DAO achetés éligibles à la soumission
- `/soumissions/create/:daoId` : formulaire complet de soumission
- `/soumissionnaire/mes-soumissions` : liste lecture seule des soumissions envoyées
- `/soumissions/:id/view` : vue détaillée de la soumission (admin + membres DGGT)
- `/admin/soumissions` : liste globale des soumissions

---

## 🛠️ Fonctionnalités principales

### ✅ Soumission
- Affichage dynamique du DAO ciblé avec rappel des critères et deadline
- Formulaire divisé en sections dynamiques :
  - **Offre technique** : champ texte WYSIWYG + upload fichiers (PDF, Word)
  - **Offre financière** : bordereau des prix (tableau dynamique calculé)
  - **Planning d’exécution** : dates, livrables
  - **Personnel et matériel** : tableaux dynamiques + pièces justificatives
  - **Pièces jointes obligatoires** : CV, attestations, assurances, certificats
- Validation des champs en temps réel + alertes critiques
- Vérification de complétude automatique (critères remplis, fichiers requis)
- **Soumission unique** : une seule soumission possible par DAO
- Une fois déposée :
  - Verrouillage complet du formulaire
  - Passage en lecture seule
  - Accusé de réception + tracking horodaté

### 🔐 Sécurité & restrictions
- Accès restreint aux DAO achetés
- Uploads sécurisés avec scan antivirus si possible
- Trace utilisateur : IP, date/heure, ID DAO
- API sécurisée par token d’authentification

---

## 🖥️ UI/UX

- 🌸 Utilisation complète de **DaisyUI** :
  - `form`, `tabs`, `alert`, `modal`, `toast`, `file-input`, `steps`, `progress`
- 🎯 Icônes via **Heroicons** :
  - `arrow-up-on-square` (upload)
  - `lock-closed` (verrouillage après soumission)
  - `check-circle`, `document-text`, `cloud-upload`
- Design responsive, clair, structuré :
  - Mobile / tablette / desktop
  - Steps verticals ou horizontaux selon taille écran
- Thème institutionnel (bleu DGGT, fond sobre)
- Accessibilité :
  - Navigable clavier
  - `aria-*` sur les inputs
  - Contraste WCAG 2.1 AA

---

## 🧱 Backend & Données

- 🔄 Modèles à prévoir :
  - `Soumission` (id, daoId, userId, statut, dateSoumission)
  - `OffreTechnique`, `OffreFinanciere`, `Planning`, `Justificatifs`
- 📁 Stockage fichiers :
  - Organisation par DAO / Soumissionnaire
  - Chemins traçables, fichiers versionnés
- 🔐 API REST sécurisée :
  - POST `/api/soumissions`
  - GET `/api/soumissions/:id`
  - Auth via JWT
- 📊 Statuts de soumission :
  - `En cours`, `Soumis`, `Verrouillé`, `Invalide`

---

## 📦 Livrables Cursor AI

- Composants Vue 3 :
  - `SoumissionForm.vue`
  - `SoumissionList.vue`
  - `SoumissionDetail.vue`
  - `UploadSection.vue`
  - `CritereValidator.vue`
- Backend :
  - `soumission.service.ts`
  - `soumission.controller.ts`
  - `soumission.model.ts`
- Séparation UI / logique :
  - Utilisation `Pinia` ou `Composable` Vue 3
- Tests unitaires :
  - Validation formulaire
  - Statut de verrouillage
- Documentation :
  - `/docs/soumission.md` manuel utilisateur
  - `/docs/soumission-tech.md` pour maintenance

---

## 📘 Notes techniques

- Ajout d’un champ `daoId` dans chaque soumission pour suivi
- Prévoir un `watcher` automatique (ou cron) pour désactiver les soumissions après deadline
- Permettre future intégration avec le module d’évaluation automatique
- Préparer les champs d’export PDF pour dossier de soumission complet
