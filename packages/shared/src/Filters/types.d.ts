import { EntityType } from '../Entities/types';

/* eslint-disable camelcase */

export interface Filter {
    attributeKey: string;
    operator: string;
    values: string[];
}
export interface QuickFilters {
    total: number;
    total_sum: number;
    result: {
        filteredViews: any[]; // TODO
        entities: EntityType[];
    };
    quickFilters: { filter: Filter }[];
}

interface User {
    userId: string;
    licenseLevel: number;
    firstName: string;
    lastName: string;
    email: string;
    licenseId: number;
    profileImageUrl: string;
    profileThumbnailUrl: string;
}

export interface Users {
    owners: User[];
    stewards: User[];
    cdos: User[];
    cisos: User[];
    dpos: User[];
    experts: User[];
}

export interface Domain {
    label: string;
    id: string;
    description: string;
    color: string;
    isActive: boolean;
    isUserSuggestionEnabled: boolean;
    isNative: boolean;
}
export interface Status {
    key: string;
    value: string;
}
