| Indicateur  | Explication          |  |
| :--------------- |:---------------| -----:|
| API Workaround 1 | `${apiUrl}/${dataType}?includeLinks=true&name=${name}&type=${type}&versionId=${versionId} Route ignore name indication for dataType properties, so we use technicalName for this dataType |  |
| API Workaround 2 | Api return 'Finance' tag in entities, but 'FINANCE' in tags list, so we cast Finance tag to FINANCE |
| API Workaround 3 |  Samme as API Workaround 1  |
| API Workaround 4 |  API does not provide linked objects size, so we need to fetch all linked objects, then count  |
| API Workaround 5 | Workspace is not present in path for lastAccessObjects and object page. So we need to ->
1) Get all workspaces
2) Get all workspaces version for each workspace
3) Find, with versionId of an object, which workspace is linked to
4) Reconstitute the object path with the worskpace name |
| API WORKAROUND 6 | Workspace is not in entity request response, so we need to get it from search and store it in model