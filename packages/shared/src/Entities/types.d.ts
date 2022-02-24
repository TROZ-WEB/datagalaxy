/* eslint-disable camelcase */
export type FieldStatus = 'Proposed' | 'InRevision' | 'InValidation' | 'Validated' | 'Obsolete';

export interface EntityType {
    attributes?: {
        description: string;
        owners: string[];
        status: string;
        stewards: string[];
        summary: string;
        tags: string[];
    };
    childrenCount: number;
    id: string;
    location: string;
    name: string;
    path: string;
    technicalName: string;
    type: string;
}
