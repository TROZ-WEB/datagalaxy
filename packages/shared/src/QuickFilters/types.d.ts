import { EntityType } from '../Entities/types';

/* eslint-disable camelcase */
export interface QuickFilter {
    total: number;
    total_sum: number;
    result: {
        filteredViews: any[]; // TODO
        entities: EntityType[];
    };
}
