import { get } from '../Http';
import { WorkspacesResponse, WorkspaceType, FormattedWorkspace, Workspaces, Versions } from './types';

/* eslint-disable import/prefer-default-export */
export type { WorkspacesResponse, WorkspaceType, FormattedWorkspace } from './types';

export const fetchWorkspaces = async (apiUrl: string): Promise<WorkspaceType[]> => {
    try {
        const response = await get<WorkspacesResponse>(`${apiUrl}/workspaces`);

        return response.parsedBody.projects;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchFormattedWorkspaces = async (apiUrl: string): Promise<FormattedWorkspace[]> => {
    try {
        const res = [];
        const response = await get<Workspaces>(`${apiUrl}/workspaces`);
        const { projects } = response.parsedBody;
        if (projects?.length > 0) {
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].isVersioningEnabled) {
                    try {
                        // eslint-disable-next-line no-await-in-loop
                        const version = await get<Versions>(`${apiUrl}/workspaces/${projects[i].id}/versions`);
                        version.parsedBody.results.map((item) =>
                            res.push({
                                id: item.versionId,
                                label: item.versionName,
                                icon: projects[i].iconHash,
                            }),
                        );
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    res.push({
                        id: projects[i].defaultVersionId,
                        label: projects[i].name,
                        icon: projects[i].iconHash,
                    });
                }
            }
        }

        return res;
    } catch (error) {
        console.error(error);
    }

    return null;
};
