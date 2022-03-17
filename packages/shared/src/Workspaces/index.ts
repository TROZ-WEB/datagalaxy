import { get } from '../Http';
import { WorkspacesResponse, WorkspaceType } from './types';

/* eslint-disable import/prefer-default-export */
export type { WorkspacesResponse, WorkspaceType } from './types';

export const fetchWorkspaces = async (apiUrl: string): Promise<WorkspaceType[]> => {
    try {
        const response = await get<WorkspacesResponse>(`${apiUrl}/workspaces`);

        return response.parsedBody.projects;
    } catch (error) {
        console.error(error);
    }

    return null;
};
