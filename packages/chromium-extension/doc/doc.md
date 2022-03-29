## Documentation Datagalaxy


# Extension Chrome :

On utilise un “background script” (chromium-extension/dist/background.js) initialisé dans le manifest (chromium-extension/dist/manifest.json) pour détecter le clic sur l'icône de l’extension. 
Grâce à JS, on a ajouté à toutes les pages web visitées par l’utilisateur une div au ‘display : none’ qui contient notre extension encapsulée dans un Shadow DOM. Le Shadow DOM nous permet d’éviter une fuite de style. La div est affichée au clic sur l’icône de l’extension grâce au changement de style ‘display : block’.

# Styles :

On utilise styled-components pour le CSS du projet. Les polices utilisées sont chargées dans un GlobalStyle à l’extérieur du Shadow DOM, et les styles globaux à l’extension sont chargés dans un deuxième GlobalStyle à l’intérieur du Shadow DOM. Le ThemeProvider n’a pas pu être utilisé à cause du Shadow DOM, mais les couleurs utilisées dans l’application sont listées dans la variable Theme dans chromium-extension/src/Theme.js. A utiliser pour une meilleure cohérence dans l’application


# EntityPage :

EntityPage gère l’affichage d’un objet. Elle est décomposée en 3 sous-dossiers : 
Détails : infos générales de l’objet affiché.
ChildrenInfo : objets enfants (1er et 2ème degré) de l’objet affiché.
LinkedObjects : objets liés à l’objet affiché.

La ‘location’ de l’objet est passé en paramètre dans l’URL. On utilise ce paramètre pour rechercher l’entité à afficher grâce à l’API, puis on l’enregistre dans le state Redux. Ce state Redux est ensuite accessible à tous les sous-dossiers. On peut donc utiliser l’historique pour retourner à une URL précédente grâce au bouton Retour, puis retrouver le bon objet à afficher grâce au paramètre ‘location’.

On a un système de loader dans le state Redux pour ne pas afficher d’objet qui n’aurait pas encore été chargé.

	On aurait préféré utiliser l’id que la location pour la recherche dans l’API mais l’API ne le permettait pas. Le type de l’objet n’est pas consistant partout dans l’API (pour un même objet, certaines infos se trouvent dans ‘search’ et d’autres dans ‘entity’) donc nous avons été contraints d’ajouter des informations à la main dans l’objet à l’aide d’un useState.

ChildrenInfo :

On récupère les enfants de l’objet affiché grâce à l’id, le dataType et le versionId du parent, et on les enregistre dans le state Redux. On récupère ensuite les enfants de ces enfants s’ils en ont, suivant le même principe.

# EntityHeader :

Chaque objet possède un Glyph Datagalaxy qui fait partie d’une liste finie de Glyphes, accessible dans ‘shared/src/Entities/index.ts’ ayant pour types et couleurs :

bleu clair pour le type ‘catalog’
bleu foncé pour le type ‘processing’
vert clair pour le type ‘glossary’
vert foncé pour le type ‘usage’

Certains objets possèdent un logo technique qui sera récupéré depuis l’API (TO DO)

# Filters :

Pour chaque famille de filtres, on récupère toutes les valeurs possibles depuis l'API ou depuis un objet créé en front, afin d'afficher les checkbox ou boutons radios correspondants. On complète ensuite ces valeurs par l'icône et le label traduit correspondants. On obtient donc un objet :

```
fields = [
	{
		id: string;
		label: string;
		icon?: React.ReactNode;
	},
	...
]
```

Quand on coche une checkbox, on utilise ces informations afin de créer un filtre qu'on ajoute aux pickedFilters, du type :

```
filter = [
	{
		icon: [React.ReactNode],
		label: [string],
		filter: { attributeKey: string, operator: string, values: [string] },
	},
	...
]
```

L'opérateur est géré individuellement par un state propre à chaque famille de filtre.
Une fois ces filtres ajoutés à pickedFilters, on les affiche dans la barre de recherche et on les ajoute à la recherche. 

Au clic sur la croix de la barre de recherche, les filtres sont réinitialisés.

# Quick filters :

On récupère les filtres à afficher en quick filters grâce à une recherche vide (query = '', limit = 0) à l'initialisation de l'app, puis à chaque nouvelle recherche. Pour chaque quick filter, selon la valeur de l'attribute key, on cherche dans les valeurs récupérées pour les filtres (voir ci-dessus) de quel filtre il s'agit , puis on récupère son icône, son label et son filtre. Si le quick filter ne fait pas partie des familles de filtres connues, on l'ajoute tel quel. On crée ainsi un array enhancedQuickFilters :

```
enhancedQuickFilters = [
	{
		icon: React.ReactNode,
		label: string,
		filter: { attributeKey: string, operator: string, values: [string] },
	},
	...
]
```

Si le filtre n'a aucune valeurs, c'est un filtre ouvert. On affiche alors la modal de la famille du filtre. Sinon, c'est un filtre fermé qu'on ajoute directement a pickedFilters.




