# Module Dépouillement et Évaluation des Offres — Sous-commission DGGT

---

## 🎯 Objectif

Permettre aux membres de la sous-commission de dépouiller et évaluer les offres d’un DAO, en assurant une traçabilité complète, une interface claire et une gestion rigoureuse des droits d’accès.

---

## 📁 Routes frontend

- `/depouillement/:daoId` — Page unique combinant le dépouillement puis l’évaluation
- `/evaluation/:daoId` — Accès direct à l’évaluation (après clôture du dépouillement)

---

## 🛠 Fonctionnalités détaillées

### Dépouillement

- Affichage en lecture seule de toutes les soumissions reçues pour le DAO sélectionné, avec pour chaque soumission :
  - Nom de l’entreprise soumissionnaire
  - Prix proposé (chiffré, sans détail confidentiel)
  - Date et heure précise du dépôt de l’offre
  - Nom et rôle de l’utilisateur ayant effectué le dépôt
  - Localisation géographique (pays, ville) dérivée de l’IP au dépôt si disponible
- Filtres avancés, tri et recherche par nom, prix, date, localisation
- Téléchargement des pièces jointes (bordereau, documents associés)
- Bouton **« Mettre fin au dépouillement »** verrouillant définitivement cette étape
- Notification automatique de clôture envoyée aux membres sous-commission et admins

### Évaluation

- Activée uniquement après clôture du dépouillement
- Calcul automatique des scores pondérés par critère selon coefficients DAO
- Vérification stricte que la somme des coefficients est égale à 100%
- Classement automatique des offres par score total
- Interface permettant ajustement manuel des notes par critère, avec commentaires libres
- Génération automatique du procès-verbal (PV) d’évaluation au format PDF
- Signature numérique du PV par les membres de la sous-commission
- Transmission sécurisée du PV à la commission d’attribution

---

## 🎨 UI/UX

- Interface claire, épurée, responsive, combinant dépouillement et évaluation dans une même page, avec sections distinctes
- Fenêtres modales uniquement pour consultation détaillée et saisie rapide de notes/commentaires
- Alertes visibles en cas d’incohérence (ex : coefficients ≠ 100%)
- Boutons d’action bien visibles avec confirmation avant actions critiques (clôture dépouillement, validation PV)
- Utilisation de DaisyUI pour composants (tables, modals, alerts, toasts)
- Icônes Heroicons pour actions visuelles
- Accessibilité (WCAG 2.1 AA)
- Responsive mobile-first

---

## 🔐 Sécurité & Accès

- Accès réservé aux membres autorisés : sous-commission, SPM, admin DGGT
- Lecture seule pour membres non habilités à modifier
- Audit complet des actions (qui, quand, quoi) avec journalisation conforme ISO 27001

---

## 🧱 Backend & Données

- Modèles relationnels : Offres, Évaluations, Procès-verbaux liés aux DAO et soumissionnaires
- API REST sécurisée avec contrôle d’accès RBAC strict
- Stockage sécurisé des PV signés avec horodatage et traçabilité complète
- Notifications automatiques liées au workflow

---

## 📦 Livrable Cursor AI attendu

- Frontend Vue 3 avec Tailwind CSS, DaisyUI, Heroicons, testable dans navigateur  
- Backend robuste avec API sécurisée et logique métier complète  
- Workflow complet : dépouillement → évaluation → génération PV → signature numérique → transmission  
- Interface claire, responsive, accessible, avec commentaires dans le code  
- Documentation utilisateur et manuel de maintenance dans `/docs`

---

Veux-tu que je génère le fichier prompt `.prompt.md` complet prêt à injecter dans Cursor AI pour ce module, ou préfères-tu un découpage par sous-parties (dépouillement, évaluation, audit) ?
