/* eslint-disable camelcase */
export type FieldStatus = 'Proposed' | 'InRevision' | 'InValidation' | 'Validated' | 'Obsolete';

export interface EntityType {
    id: string;
    name: string;
    technicalName: string;
    type: string;
    path: string;
    location: string;
    attributes?: {
        owners: string[];
        stewards: string[];
        status: string;
    };
}
