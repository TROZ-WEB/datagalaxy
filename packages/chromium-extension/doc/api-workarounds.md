| Indicateur  | Explication          |  |
| :--------------- |:---------------| -----:|
| API Workaround 1 | `${apiUrl}/${dataType}?includeLinks=true&name=${name}&type=${type}&versionId=${versionId} Route ignore name indication for dataType properties, so we use technicalName for this dataType |  |
| API Workaround 2 | Api return 'Finance' tag in entities, but 'FINANCE' in tags list, so we cast Finance tag to FINANCE |
| API Workaround 3 |  Samme as API Workaround 1  |
| API Workaround 4 |  API does not provide linked objects size, so we need to fetch all linked objects, then count  |
