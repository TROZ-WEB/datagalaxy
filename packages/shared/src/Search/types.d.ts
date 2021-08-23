/* eslint-disable camelcase */
export interface SearchEntity {
    id: string;
    name: string;
    technicalName: string;
    type: string;
    path: string;
    location: string;
}

export interface SearchResponse {
    total: number;
    total_sum: number;
    result: {
        entities: SearchEntity[];
    };
}
