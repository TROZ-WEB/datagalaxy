/* eslint-disable import/prefer-default-export */
import { post, get } from '../Http';
import { QuickFilters, Workspaces } from './types';

export type { Filter, QuickFilters, Workspaces } from './types';

export const fetchQuickFilters = async (apiUrl: string, query: string, versionId: string): Promise<QuickFilters> => {
    try {
        let response;
        if (versionId) {
            response = await post<QuickFilters>(`${apiUrl}/search`, {
                query,
                versionId,
                limit: 0,
            });
        } else {
            response = await post<QuickFilters>(`${apiUrl}/search`, {
                query,
                limit: 0,
            });
        }

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchWorkspaces = async (apiUrl: string): Promise<Workspaces> => {
    try {
        const response = await get<Workspaces>(`${apiUrl}/workspaces`);
        const { projects } = response.parsedBody;
        if (projects?.length > 0) {
            for (let i = 0; i < projects.length; i++) {
                if (projects[i].isVersioningEnabled) {
                    try {
                        const version = get<string>(`${apiUrl}/workspaces/${projects[i].id}/versions`)

                        // return version.
                    } catch (error) {
                        console.error(error);
                    }
                }
            }
        }

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;

    // get<Workspaces>(`${apiUrl}/workspaces`)
    //     .then((response) => {
    //         const { projects } = response.parsedBody;
    //         if (projects?.length > 0) {
    //             for (let i = 0; i < projects.length; i++) {
    //                 if (projects[i].isVersioningEnabled) {
    //                     get<Workspaces>(`${apiUrl}/workspaces/${projects[i].id}/versions`)
    //                         .then((res) => res.parsedBody)
    //                         .catch((error) => console.error(error));
    //                 }
    //             }
    //         }

    //         return response.parsedBody;
    //     })
    //     .catch((error) => console.error(error));

    // return null;
};
