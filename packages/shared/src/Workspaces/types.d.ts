export interface Workspace {
    id: string;
    defaultVersionName: string;
    defaultVersionId: string;
    name: string;
    imageHash: string;
    iconHash: string;
}

export interface Workspaces {
    projects: Workspace[];
}
