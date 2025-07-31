# Presentation du repo

Ce repo est le systeme pour Myriades. il est fait pour foundryvtt 13.

https://foundryvtt.com/api/modules.html

### Introduction

Le but de ce système est de permettre à tous les joueurs d'avoir accès à la magie.

Il ne doit pas empêcher l'existence de sorciers et de magiciens (donc de spécialistes en magie) mais ne doit pas non plus être une corvée pour les joueurs d'inclure la magie dans leur gameplay.

L'idée est d'intégrer la magie dans le monde de manière naturelle et d'en permettre la customisation.

\[\[Création de perso rapide]]

### Les Jets de dés

Tous les jets de dés se font sur un dé 100, les réussites étant inférieures au nombre indiqué et les échecs au-dessus. Un échec critique est de 96 à 100 ou sur un double raté (77, 88...). Une réussite critique est de 1 à 5 ou sur un double réussi (11, 22...).

Le système intègre la **marge de réussite**, qui est la différence entre la caractéristique testée et le jet de dés. Une plus grande marge signifie une réussite plus nette, tandis qu'un échec avec une faible marge peut être partiellement atténué.

### Les caractéristiques

Elles sont au nombre de 4 et sont séparées entre caractéristiques physiques et d'esprit.

* **Puissance**
* **Coordination**
* **Ingéniosité**
* **Perspicacité**

Elles vont de 0 à 100. Tous les jets se font sur ces caractéristiques. Tous les personnages commencent avec 200 points à attribuer dans chaque caractéristique, avec un minimum de 40 et un max de 60. Chaque point de caractéristique coûte 2xp jusqu'à **palier max -40**(typiquement 60) puis 3xp par point jusqu'à **palier max -20**( typiquement 80 ) puis 4xp par point. Un personnage ayant 0 ou moins dans une caractéristique est inconscient.

#### Paliers surhumains

Certaines créatures possèdent des **paliers surhumains** dans certaines de leurs caractéristiques, leur permettant d'excéder les limitations normales. Ces paliers n'augmentent pas directement leurs scores de caractéristiques mais **étendent leur seuil maximal possible**.

* Une créature dotée d'un palier surhumain en **Puissance** (ex: un dragon) pourrait avoir un seuil effectif de 120 au lieu de 100.
* Les jets continuent à se faire avec  100, mais lors d'un test contesté, elle bénéficie d'un **bonus de marge équivalent à la différence entre son seuil et 100** (ex: +20 si son seuil est 120).
* Un personnage normal peut débloquer un palier surhumain grâce à des entraînements spéciaux, des compétences avancées ou des artefacts.

### Les compétences

Les compétences peuvent être des bonus correspondant à des aptitudes (nager, escrime, chanter...) ou être une capacité unique (Récupère x points de vie après un combat, peut parler aux animaux). Le joueur commence avec 5 points qu'il peut attribuer à plusieurs compétences. Les aptitudes sont gradées de I à V. Chaque grade coûte 1 point de compétence \* le niveau du grade. Les capacités uniques peuvent coûter plusieurs points de compétence.

Certaines **compétences raciales** permettent aux créatures extraordinaires (dragons, titans, esprits) d'obtenir des **bonus similaires aux paliers surhumains**, leur conférant des avantages spécifiques dans des situations précises.

Un point de compétence coûte 5xp.

\[\[Liste de compétences]]

##### Les Domaines

Les Domaines sont sous quelle forme tu manifestes la magie:

* Un élément (feu, eau, terre, air mais aussi vie, mort, lumière, temps, espace, néant et autres)
* Les corps (Augmenter des aptitudes ou des caractéristiques, avoir des capacités surnaturelles)
* L’immatériel (projection de l'esprit, afflictions)

\[\[Liste de médiums]]

##### Les Arts

Les Arts sont la manière dont le personnage s'y prend pour manifester la magie :

* En faisant des arts martiaux
* En gesticulant et en lisant des incantations.
* En suivant de longs et rigoureux rituels.

Mais aussi la manière dont ils sont:

* En étant affecté par les endroits où il pratique la magie (Leylines, lumière de la lune...)
* En limitant les Domaines qu'il peut utiliser.
* Devoir porter un symbole religieux ou un outil particulier sur soi.

Le Medium impose donc des limites, mais en échange il donne en retour des avantages:

* La manière de manifester la magie est silencieuse (Par exemple en faisant des arts martiaux)
* Peut être lancée à un grade de magie plus bas
* La magie a des effets renforcés ou différents (plus de dommages, plus grande portée, ne blesse pas les alliés)

[Liste des Arts](https://www.worldanvil.com/w/myriade-mandraw/a/liste-de-mediums)

### Les voies

Chaque personnage peut suivre une voie. Chaque voie donne des bonus (et éventuels malus) au personnage (le tout en général équivalent à 15xp). Un joueur peut choisir de ne pas avoir de voie et commencera avec 15xp supplémentaires. Le personnage peut changer de voie (et donc perdre les bonus et malus dérivant de sa précédente voie) pour 10xp. Il doit expliquer comment il réussit à faire ça.

\[\[Liste de voies]]

### La magie

La magie est liée à une caractéristique choisie par le joueur à la création du personnage ou à celle de son Art. Le personnage a un total de points de magie égal à deux fois les dizaines de la caractéristique de magie. Chaque sort a un grade allant de I à V. Utiliser un sort utilise autant de points de magie que son grade. Un personnage peut ne pas utiliser de points de magie pour lancer un sort, pour cela il doit lancer autant de dés que le grade du sort:

* Chaque échec inflige 5 points de dégâts temporaires à la caractéristique de magie du personnage.
* Un échec critique en inflige 10.
* Une réussite critique en restaure 5.

Les créatures ou personnages ayant des **paliers surhumains en magie** peuvent avoir une réserve de points de magie augmentée et des seuils de réussite accrus sur les sorts de leur spécialité.

### Les objets

L'inventaire des personnages est organisé sous forme de **grille à cases**. L’encombrement est représenté non pas par le poids absolu des objets, mais par **l’espace qu’ils occupent** dans cette grille. Un objet volumineux ou lourd prendra plus de cases qu’un objet léger ou compact.
.\*\*

#### Inventaire et encombrement

* Chaque personnage possède une **grille d’inventaire de base de 6x6 cases**.
* Les objets prennent plus ou moins de place selon leur type (ex : une épée longue peut prendre 1x4 cases, une potion 1x1 case, un sac 2x2, etc).
* Les objets transportés au-delà de la grille sont considérés comme **mal rangés** : ils peuvent tomber, être plus longs à équiper, et/ou donner des malus au personnage.

#### Capacité et équipements

* Certains objets (sacoches, harnais, sacs) peuvent **ajouter des cases à la grille d’inventaire**.

* Un personnage dispose d’un **nombre total de cases égal à 36 (6x6) + Puissance / 5**, arrondi à l’inférieur.

* Des objets peuvent être **équipés** (armure, armes, outils...) et n’occupent alors pas de case d’inventaire.

* Des objets peuvent être **équipés** (armure, armes, outils...) et n’occupent alors pas de case d’inventaire.

#### Objets et effets

Chaque objet peut avoir une ou plusieurs propriétés :

* **Utilisable** (ex : potion, parchemin, charge magique)
* **Équipable** (ex : épée, armure, amulette)
* **Magique** (peut contenir des sorts ou effets surnaturels)
* **Consommable** (disparaît après usage)
* **Jetable** (peut être utilisé comme arme improvisée)

L’effet d’un objet est défini par une ou plusieurs lignes descriptives, ex. :

* *Potion de soins I* : soigne 1d10 PV
* *Cape de brume* : 1 fois par combat, permet d’annuler un jet d’attaque adverse sur un 1-25

\[\[Liste d'exemples d'objets]]
