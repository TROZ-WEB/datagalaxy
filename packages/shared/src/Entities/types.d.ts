/* eslint-disable camelcase */
export type FieldStatus = 'Proposed' | 'InRevision' | 'InValidation' | 'Validated' | 'Obsolete';

export interface ExactMatch {
    attributeKey: string;
    value: string;
}

export interface Link {
    name: string;
    url: string;
}

export interface EntityType {
    attributes?: {
        description: string;
        owners: string[];
        status: string;
        stewards: string[];
        summary: string;
        tags: string[];
        externalUrl: Link;
    };
    childrenCount: number;
    id: string;
    location: string;
    name: string;
    path: string;
    technicalName: string;
    type: string;
    dataType: string;
    childrenObjects: EntityType[];
    versionId: string;
    isExactMatch: boolean;
    exactMatchAttributes: ExactMatch[];
    objectUrl: string;
}
