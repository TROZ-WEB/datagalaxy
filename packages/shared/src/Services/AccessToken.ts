import { decodeJWT, getAccessToken } from '../Auth';

class AccessToken {
    private static instance: AccessToken;
    private pat: string;
    private pubapi: string;
    private accessToken: string;
    private expDate: number;

    private constructor() {}

    public static getInstance(): AccessToken {
        if (!AccessToken.instance) {
            AccessToken.instance = new AccessToken();
        }

        return AccessToken.instance;
    }

    public async init(pat: string): Promise<void> {
        this.pat = pat;

        const decodedPat = decodeJWT(this.decodePat());

        this.pubapi = decodedPat.pubapi;

        // Generate first accessToken
        await this.refreshAccessToken();
    }

    private decodePat(): string {
        return atob(this.pat);
    }

    /**
     * If the accessToken has expired, a new one is generated and returned.
     * @returns return the accessToken: string
     */
    public async getAccessToken(): Promise<string> {
        // TODO: compare 'exp' date to current date
        // const currentTimestampInSeconds = Math.floor(Date.now() / 1000);

        // if (this.expDate + 3600 > currentTimestampInSeconds - 5) {
        //     return this.accessToken;
        // }

        // await this.refreshAccessToken();

        return this.accessToken;
    }

    /**
     * Refesh and return a brand new accesToken
     * @returns return the accessToken: string
     */
    public async refreshAccessToken(): Promise<string> {
        this.accessToken = await getAccessToken(this.pubapi, this.decodePat());
        const decodedAccessToken = decodeJWT(this.accessToken);

        this.expDate = decodedAccessToken.exp;

        return this.accessToken;
    }
}

export default AccessToken;
