export interface WorkspacesResponse {
    projects: WorkspaceType[];
}

export interface WorkspaceType {
    id: string;
    name: string;
    imageHash: string;
}

export interface FormattedWorkspace {
    id: string;
    label: string;
    icon: any;
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
            trigram: string;
            imageHash: string;
            iconHash: string;
        },
    ];
}

export interface Versions {
    pages: number;
    total: number;
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
