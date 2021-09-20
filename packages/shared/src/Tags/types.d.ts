/* eslint-disable camelcase */
export interface TagsResponse {
    pages: number;
    total: number;
    total_sum: number;
    next_page: number;
    results: TagType[];
}

export interface TagType {
    id: string;
    label: string;
    description: string;
    color: string;
    isActive: boolean;
    isUserSuggestionEnabled: boolean;
    isNative: boolean;
}
