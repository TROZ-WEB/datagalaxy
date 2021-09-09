import { EntityType } from '../Entities/types';

/* eslint-disable camelcase */
export interface SearchResponse {
    total: number;
    total_sum: number;
    result: {
        entities: EntityType[];
    };
}
