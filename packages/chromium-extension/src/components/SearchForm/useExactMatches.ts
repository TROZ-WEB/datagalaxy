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
            t.result.entities = exactMatches.result.entities.map((e) => {
                const entity = e;

                const displayName = entity.exactMatchAttributes.find((o) => o.attributeKey === 'DisplayName');
                const technicalName = entity.exactMatchAttributes.find((o) => o.attributeKey === 'TechnicalName');
                const primaryKeyTechnicalName = entity.exactMatchAttributes.find(
                    (o) => o.attributeKey === 'PrimaryKeyTechnicalName',
                );
                const tableDisplayName = entity.exactMatchAttributes.find((o) => o.attributeKey === 'TableDisplayName');
                const tableTechnicalName = entity.exactMatchAttributes.find(
                    (o) => o.attributeKey === 'TableTechnicalName',
                );
                if (displayName?.value.toLowerCase() === entity.name.toLowerCase()) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'DisplayName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (technicalName?.value.toLowerCase() === entity.name.toLowerCase()) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TechnicalName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    technicalName &&
                    displayName &&
                    technicalName?.value.toLowerCase() === displayName?.value.toLowerCase()
                ) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TechnicalName');
                    entity.exactMatchAttributes.splice(index, 1);
                }

                if (primaryKeyTechnicalName?.value.toLowerCase() === entity.name.toLowerCase()) {
                    const index = entity.exactMatchAttributes.findIndex(
                        (o) => o.attributeKey === 'PrimaryKeyTechnicalName',
                    );
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    (primaryKeyTechnicalName &&
                        displayName &&
                        primaryKeyTechnicalName?.value.toLowerCase() === displayName?.value.toLowerCase()) ||
                    (primaryKeyTechnicalName &&
                        technicalName &&
                        primaryKeyTechnicalName?.value.toLowerCase() === technicalName?.value.toLowerCase())
                ) {
                    const index = entity.exactMatchAttributes.findIndex(
                        (o) => o.attributeKey === 'PrimaryKeyTechnicalName',
                    );
                    entity.exactMatchAttributes.splice(index, 1);
                }
                if (tableDisplayName?.value.toLowerCase() === entity.name.toLowerCase()) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TableDisplayName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    (tableDisplayName &&
                        displayName &&
                        tableDisplayName?.value.toLowerCase() === displayName?.value.toLowerCase()) ||
                    (tableDisplayName &&
                        technicalName &&
                        tableDisplayName?.value.toLowerCase() === technicalName?.value.toLowerCase())
                ) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TableDisplayName');
                    entity.exactMatchAttributes.splice(index, 1);
                }

                if (tableTechnicalName?.value.toLowerCase() === entity.name.toLowerCase()) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TableTechnicalName');
                    entity.exactMatchAttributes.splice(index, 1);
                    entity.exactMatchOccuredOnName = true;
                }

                if (
                    (tableTechnicalName &&
                        displayName &&
                        tableTechnicalName?.value.toLowerCase() === displayName?.value.toLowerCase()) ||
                    (tableTechnicalName &&
                        technicalName &&
                        tableTechnicalName?.value.toLowerCase() === technicalName?.value.toLowerCase())
                ) {
                    const index = entity.exactMatchAttributes.findIndex((o) => o.attributeKey === 'TableTechnicalName');
                    entity.exactMatchAttributes.splice(index, 1);
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
