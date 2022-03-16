import { useEffect, useState } from 'react';
import { SearchResponse } from 'shared';

type UseExactMatchesResult = {
    filteredExactMatches: SearchResponse;
};

const useExactMatches = (exactMatches: SearchResponse): UseExactMatchesResult => {
    const [filteredExactMatches, setFilteredExactMatches] = useState<SearchResponse>();

    useEffect(() => {
        if (exactMatches && exactMatches.result) {
            const t = exactMatches;
            t.result.entities = exactMatches.result.entities.map((entity) => {
                const displayName = entity.exactMatchAttributes.find((o) => o.attributeKey === 'DisplayName');
                const technicalName = entity.exactMatchAttributes.find((o) => o.attributeKey === 'TechnicalName');
                const primaryKeyTechnicalName = entity.exactMatchAttributes.find(
                    (o) => o.attributeKey === 'PrimaryKeyTechnicalName',
                );
                const tableDisplayName = entity.exactMatchAttributes.find((o) => o.attributeKey === 'TableDisplayName');
                const tableTechnicalName = entity.exactMatchAttributes.find(
                    (o) => o.attributeKey === 'TableTechnicalName',
                );
                if (displayName?.value === entity.name) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'DisplayName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (technicalName?.value === entity.name || technicalName?.value === displayName?.value) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TechnicalName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    primaryKeyTechnicalName?.value === entity.name ||
                    primaryKeyTechnicalName?.value === displayName?.value ||
                    primaryKeyTechnicalName?.value === technicalName?.value
                ) {
                    const index = entity.exactMatchAttributes.findIndex(
                        (o) => o.attributeKey === 'PrimaryKeyTechnicalName',
                    );
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    tableDisplayName?.value === entity.name ||
                    tableDisplayName?.value === displayName?.value ||
                    tableDisplayName?.value === technicalName?.value
                ) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TableDisplayName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    tableTechnicalName?.value === entity.name ||
                    tableTechnicalName?.value === displayName?.value ||
                    tableTechnicalName?.value === technicalName?.value
                ) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TableTechnicalName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                return entity;
            });
            setFilteredExactMatches(t);
        }
    }, [exactMatches]);

    return {
        filteredExactMatches,
    };
};

export default useExactMatches;
