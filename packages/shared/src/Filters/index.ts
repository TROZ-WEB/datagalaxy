/* eslint-disable import/prefer-default-export */
import { post, get } from '../Http';
import { QuickFilters, Workspaces, Versions, FormatedWorkspace, Filter, Users, Technologies } from './types';

export type { Filter, QuickFilters, FormatedWorkspace, Users, Technologies } from './types';

export const fetchQuickFilters = async (
    apiUrl: string,
    query: string,
    versionId: string,
    filters: Filter[],
): Promise<QuickFilters> => {
    try {
        let response;
        if (versionId) {
            response = await post<QuickFilters>(`${apiUrl}/search`, {
                query,
                versionId,
                filters,
                limit: 0,
            });
        } else {
            response = await post<QuickFilters>(`${apiUrl}/search`, {
                query,
                filters,
                limit: 0,
            });
        }

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchWorkspaces = async (apiUrl: string): Promise<FormatedWorkspace[]> => {
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
                            res.push({ id: item.versionId, label: item.versionName }),
                        );
                    } catch (error) {
                        console.error(error);
                    }
                } else {
                    res.push({ id: projects[i].defaultVersionId, label: projects[i].name });
                }
            }
        }

        return res;
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

export const fetchUsers = async (apiUrl: string): Promise<Users> => {
    try {
        const response = await get<Users>(`${apiUrl}/users/roles`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};

export const fetchTechnologies = async (apiUrl: string): Promise<Technologies> => {
    try {
        const response = await get<Technologies>(`${apiUrl}/technologies`);

        return response.parsedBody;
    } catch (error) {
        console.error(error);
    }

    return null;
};
