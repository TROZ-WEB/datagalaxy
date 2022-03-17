/* eslint-disable camelcase */
export interface TechnologiesResponse {
    technologies: TechnologyType[];
}

export interface TechnologyType {
    id: string;
    technologyCode: string;
    imageHash: string;
}
