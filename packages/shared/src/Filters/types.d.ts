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
    nameUnit?: string;
}
export interface PickedFilter {
    filter: Filter;
    icon?: any;
    content?: string[];
    name?: string;
    nameUnit?: string;
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
