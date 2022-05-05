import { EntityType } from '../Entities/types';
import { Filter } from '../Filters/types';

/* eslint-disable camelcase */
export interface SearchResponse {
    total: number;
    total_sum: number;
    result: {
        filteredViews: any[];
        entities: EntityType[];
    };
    quickFilters: { filter: Filter }[];
}

export interface SearchHistoryResponse {
    total: number;
    history: SearchHistoryType[];
}

export interface SearchHistoryType {
    accessCount: number;
    searchPayload: {
        query: string;
        versionId: string;
        limit: number;
        filters: Filter[];
        saveSearchPayload: boolean;
    };
}
