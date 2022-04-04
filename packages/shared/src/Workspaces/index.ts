import { get } from '../Http';
import { Workspace, Workspaces } from './types';

/* eslint-disable import/prefer-default-export */
export type { Workspace, Workspaces } from './types';

export const fetchWorkspaces = async (apiUrl: string): Promise<Workspace[]> => {
    try {
        const response = await get<Workspaces>(`${apiUrl}/workspaces`);

        return response.parsedBody.projects;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchWorkspacesVersions = async (apiUrl: string, workspaceId: string): Promise<string[]> => {
    try {
        const response = await get<any>(`${apiUrl}/workspaces/${workspaceId}/versions`);

        return response.parsedBody.results.map((result) => result.versionId);
    } catch (error) {
        console.error(error);
    }

    return null;
};
