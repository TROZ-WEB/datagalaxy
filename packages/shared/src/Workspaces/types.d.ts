export interface WorkspacesResponse {
    projects: WorkspaceType[];
}

export interface WorkspaceType {
    id: string;
    name: string;
    imageHash: string;
}
