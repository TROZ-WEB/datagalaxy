/* eslint-disable camelcase */

export type governanceRole = 'owner' | 'steward' | 'dpo' | 'cdo' | 'ciso' | 'expert';

export interface UserEntity {
    userId: string;
    licenseLevel: string;
    firstName: string;
    lastName: string;
    email: string;
    licenseId: number;
    profileImageUrl: string;
    profileThumbnailUrl: string;
}

export interface UsersResponse {
    total: number;
    total_sum: number;
    result: UserEntity[];
}

export interface UsersByRoleResponse {
    [key: string]: UserEntity[];
}
