import { EntityType } from '../Entities/types';

/* eslint-disable camelcase */

export interface QuickFilter {
    filter: {
        attributeKey: string;
        operator: string;
        values: string[];
    };
}
export interface QuickFilters {
    total: number;
    total_sum: number;
    result: {
        filteredViews: any[]; // TODO
        entities: EntityType[];
    };
    quickFilters: QuickFilter[];
}
