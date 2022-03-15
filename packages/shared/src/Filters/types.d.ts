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

export interface FormatedWorkspace {
    id: string;
    label: string;
}

export interface Workspaces {
    organizations: [
        {
            name: string;
            id: string;
            description: string;
            defaultVersionName: string;
            defaultVersionId: string;
            isVersioningEnabled: true;
            defaultOwnerUser: {
                firstname: string;
                lastname: string;
                fullname: string;
                email: string;
                userId: string;
            };
            defaultStewardUser: {
                firstname: string;
                lastname: string;
                fullname: string;
                email: string;
                userId: string;
            };
        },
    ];
    projects: [
        {
            name: string;
            id: string;
            description: string;
            defaultVersionName: string;
            defaultVersionId: string;
            isVersioningEnabled: true;
            defaultOwnerUser: {
                firstname: string;
                lastname: string;
                fullname: string;
                email: string;
                userId: string;
            };
            defaultStewardUser: {
                firstname: string;
                lastname: string;
                fullname: string;
                email: string;
                userId: string;
            };
        },
    ];
}

export interface Versions {
    pages: number;
    total: number;
    total_sum: number;
    next_page: string;
    results: [
        {
            workspaceName: string;
            versionName: string;
            originVersionId: string;
            originVersionName: string;
            isDefaultVersion: boolean;
            versionId: string;
        },
    ];
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
export interface Technologies {
    total: 0;
    technologies: [
        {
            displayName: string;
            technologyCode: string;
            modules: string[];
            descriptionFr: string;
            descriptionEn: string;
            imageHash: string;
            thumbnailHash: string;
            svgImageHash: string;
            creationTime: string;
            creationUserId: string;
            lastModificationTime: string;
            lastModificationUserId: string;
            lastUsageTime: string;
            lastUsageUserId: string;
        },
    ];
}
