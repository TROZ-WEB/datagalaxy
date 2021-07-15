import jwtDecode from 'jwt-decode';
import { DecodedPAT } from './types';

export const decodePAT = (integrationToken: string): DecodedPAT => {
    return jwtDecode<DecodedPAT>(integrationToken);
};
