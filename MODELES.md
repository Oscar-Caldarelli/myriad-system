# Modèles de Données du Système Myriad

Ce document présente les modèles de données utilisés dans le système Myriad pour Foundry VTT, comprenant les modèles d'Acteurs (personnages et PNJ) et d'Objets (objets, compétences, sorts, etc.).

## Structure Générale

Le système est construit sur une hiérarchie de modèles de données :

```
MyriadSystemDataModel (base-model.mjs)
├── MyriadSystemActorBase (base-actor.mjs)
│   ├── MyriadSystemCharacter (actor-character.mjs)
│   └── MyriadSystemNPC (actor-npc.mjs)
└── MyriadSystemItemBase (base-item.mjs)
    ├── MyriadSystemFeature (item-feature.mjs)
    ├── MyriadSystemItem (item-item.mjs)
    ├── MyriadSystemSpell (item-spell.mjs)
    └── MyriadSystemPath (item-voie.mjs → à renommer item-path.mjs)
```

## Modèles d'Acteurs

### MyriadSystemActorBase

Classe de base pour tous les acteurs du système Myriad.

**Propriétés** :

- `health` : Points de vie (valeur actuelle et maximum)
- `power` : Points de pouvoir (valeur actuelle et maximum)
- `biography` : Biographie du personnage

### MyriadSystemCharacter

Modèle pour les personnages joueurs.

**Propriétés spécifiques** :

- `characteristics` : Caractéristiques du personnage
  - `puissance` : Force physique (valeur, max, bonus, malus)
  - `coordination` : Agilité et précision (valeur, max, bonus, malus)
  - `ingeniosite` : Intelligence et créativité (valeur, max, bonus, malus)
  - `perspicacite` : Perception et intuition (valeur, max, bonus, malus)
- `xp` : Points d'expérience
  - `value` : XP dépensés
  - `earned` : XP gagnés au total
  - `unspent` : XP non dépensés (calculé)

**Fonctions** :

- `prepareDerivedData()` : Calcule les modificateurs de caractéristiques et les PV max basés sur la Puissance
- `getRollData()` : Prépare les données pour les jets de dés

### MyriadSystemNPC

Modèle pour les PNJ (Personnages Non-Joueurs).

**Propriétés spécifiques** :

- `cr` : Indice de difficulté du PNJ
- `xp` : Points d'expérience accordés

## Modèles d'Objets

### MyriadSystemItemBase

Classe de base pour tous les objets du système Myriad.

**Propriétés** :

- `description` : Description de l'objet
- `tags` : Tags pour catégoriser l'objet
- `grade` : Niveau de la competence (I à V)

### MyriadSystemFeature

Modèle pour les capacités et aptitudes.

**Propriétés spécifiques** :

- `isPassive` : Indique si c'est une competence passive
- `acquisition` : Informations sur l'acquisition
  - `prerequisites` : Prérequis pour obtenir la competence
  - `xpCost` : Coût en points d'expérience

### MyriadSystemItem

Modèle pour les objets physiques.

**Propriétés spécifiques** :

- `quantity` : Quantité d'objets
- `weight` : Poids de l'objet

### MyriadSystemSpell

Modèle pour les sorts.

**Propriétés spécifiques** :

- `magicPointCost` : Cout du sort en points de magie

### MyriadSystemPath

Modèle pour les voies (chemins de progression).

**Propriétés spécifiques** :

- `xpCost` : Coût en points d'expérience
- `components` : Composants de la voie
  - `features` : Capacités associées
  - `arts` : Arts associés
  - `domains` : Domaines associés
  - `items` : Objets associés

## Types d'Objets Définis (template.json)

D'après le fichier template.json, le système définit les types d'objets suivants :

- `item` : Objets physiques
- `feature` : Capacités et aptitudes
- `spell` : Sorts
- `domain` : Domaines magiques
- `art` : Arts magiques
- `path` : Voie de progression

## Modèles Manquants ou Incomplets

Voici les modèles qui semblent manquer ou être incomplets dans l'implémentation actuelle :

1. **Modèles non implémentés** :
   - `item-domain.mjs` : Modèle pour les domaines magiques
   - `item-art.mjs` : Modèle pour les arts magiques

2. **Incohérences** :
   - Le nom du fichier `item-voie.mjs` devrait être renommé en `item-path.mjs` pour suivre la convention de nommage en anglais
   - Le modèle `MyriadSystemItemVoie` devrait être renommé en `MyriadSystemPath` pour maintenir la cohérence

## Suggestions d'Amélioration

1. **Homogénéiser les noms de champs** entre les modèles JavaScript et le template.json
2. **Créer les modèles manquants** pour les types d'objets définis
3. **Uniformiser les noms en anglais** pour maintenir une cohérence (renommer `voie` en `path`, etc.)
4. **S'assurer que tous les types d'objets ont un champ `grade`** plutôt que level ou d'autres variantes
5. **Documenter les champs spéciaux** comme les tags et les propriétés
6. **Ajouter des validations** pour s'assurer que les données entrées respectent le format attendu
