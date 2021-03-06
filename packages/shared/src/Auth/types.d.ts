/* eslint-disable camelcase */
import { JwtPayload } from 'jwt-decode';

export interface DecodedJWT extends JwtPayload {
    $id?: string;
    $type?: string;
    dgapi?: string;
    pubapi?: string;
    given_name?: string;
    family_name?: string;
    email?: string;
    cid?: string;
    uid?: string;
}

export interface CredentialsResponse {
    accessToken: string;
}
