| URL  | Usage          |  |
| :--------------- |:---------------| -----:|
| /${dataType}?parentId=${parentId}&versionId=${versionId}  |   Requête utilisée pour récupérer les enfants et petits enfants d'un objet. On précise le parentId et le dataType du parent, sauf dans le cas où le dataType de l'enfant est sources, fields, structures, containers. Dans ce cas on requête les 4 types, toujours avec le dataType du parent. |  |
| /${location}  | Récupère les informations d'un objet grâce à sa propriété location.             |    |
|/attributes/values?dataType=${attributeDataType}&attributeKey=${attributeKey}  | Récupère la liste des valeurs possible d'un attribut.          |    |
|/attributes/dataType=${dataType}  | Récupère les attributs possibles pour un dataType.          |    |
|/attributes/values?dataType=common&attributeKey=Domains  | Récupère tous les domaines.          |    |
|/attributes/values?dataType=common&attributeKey=EntityStatus  | Récupère les satuts.          |    |
|/${dataType}?includeLinks=true&name=${name}&type=${type}&versionId=${versionId}  | Récupère les objets liés a un objet. Cette requête renvoi une liste d'objet ressemblant à l'objet dont on cherche les objets liés, il faut ensuite parser le tableau pour trouver les objets liés à l'objet dont on cherche les objets liés.          |    |
|/${dataType}?includeLinks=true&technicalName=${name}&type=${type}&versionId=${versionId}  | Pareil qu'au dessus mais en passant par le technicalName, car la requête ne fonctionne pas avec le name pour les objets dont le dataType est properties.          |    |
|/attributes/screens/${dataType}?versionId=${versionId}  | Récupère la configuration des écrans pour un dataType donné.          |    |
|/search  | Rehcerche des objets via différents paramètres.         |    |
|/tags?page=${page}&limit=${limit}  | Récupère tous les tags à l'initialisation du plugin.          |    |
|/technologies  | Récupère toutes les technologies à l'initialisation du plugin.          |    |
|/users?email=${email}  | Récupère les données d'un utilisateur grâce à son adresse mail.          |    |
|/users/roles?role=${role}&email=${emails}  | Récupère les données d'un utilisateur grâce à son adresse mail et son rôle.          |    |
|/users/roles | Récupère tous les utilisateurs pour un rôle donnée.          |    |