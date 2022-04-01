import { EntityType } from '../Entities/types';
import { Filter } from '../Filters/types';

/* eslint-disable camelcase */
export interface SearchResponse {
    total: number;
    total_sum: number;
    result: {
        entities: EntityType[];
    };
    quickFilters: { filter: Filter }[];
}
