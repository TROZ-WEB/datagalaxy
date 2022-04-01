import { EntityType } from '../Entities/types';

/* eslint-disable camelcase */

export interface Filter {
    attributeKey: string;
    operator: string;
    values: string[];
}
export interface EnhancedFilter {
    filter: Filter;
    icon?: any;
    content?: string;
    label?: string;
    name?: string;
}
export interface PickedFilters {
    icon?: any;
    content?: string[];
    name?: string;
    filter: Filter;
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
