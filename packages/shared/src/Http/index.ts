import { AccessToken } from '../Services';
import { HttpResponse } from './types';
import 'isomorphic-fetch';

/**
 * This http method only work with accessToken in the authorization header
 *
 * If the first attempt fails due to 401 error,
 * it will regenerate an accessToken and re-fetch the recourse with the new accessToken
 */
export async function http<T>(request: Request): Promise<HttpResponse<T>> {
    // Backup request (cannot be cloned after being used)
    const clonedRequest: Request = request.clone();

    console.info('HTTP 1');

    request.headers.set('authorization', `Bearer ${await AccessToken.getInstance().getAccessToken()}`);
    const response: HttpResponse<T> = await fetch(request);

    console.info('HTTP 2');

    try {
        response.parsedBody = await response.json();
        console.info('HTTP 3');
    } catch (error) {
        response.parsedBody = null;
        console.info('HTTP ERROR 1, GOT AN ERROR');
    }
    // Trigger custom error for unauthorized error (accessToken no more valid)
    if (!response.ok) {
        console.info('HTTP 4 - RESPONSE NOT OK');
        if (response.status === 401) {
            console.info('HTTP 5 - GOT 401');
            const newToken = await AccessToken.getInstance().refreshAccessToken();
            console.info('HTTP 6');
            clonedRequest.headers.set('authorization', `Bearer ${newToken}`);
            console.info('HTTP 7');
            const clonedResponse: HttpResponse<T> = await fetch(clonedRequest);
            console.info('HTTP 8');
            console.info('CLONED RESPONSE IS : ');
            console.info(clonedResponse);
            clonedResponse.parsedBody = await clonedResponse.json();
            console.info('CLONED RESPONSE.PARSEDBODY = ');
            console.info(clonedResponse.parsedBody);
            console.info('HTTP 9');
            if (!clonedResponse.ok) {
                console.info('HTTP 10 - NEW RESPONSE NOT OK, error is : ');
                console.info(clonedResponse.statusText);
                throw new Error(clonedResponse.statusText);
            }
        } else {
            console.info('HTTP ERROR 2, RESPONSE NOT OK BUT NOT 401');
            throw new Error(response.statusText);
        }
    }

    return response;
}

export async function get<T>(path: string, args: RequestInit = {}): Promise<HttpResponse<T>> {
    return http<T>(
        new Request(path, {
            method: 'get',
            ...args,
            headers: {
                'Content-Type': 'application/json',
                ...args.headers,
            },
        }),
    );
}

export async function post<T>(path: string, body: any, args: RequestInit = {}): Promise<HttpResponse<T>> {
    return http<T>(
        new Request(path, {
            method: 'post',
            body: JSON.stringify(body),
            ...args,
            headers: {
                'Content-Type': 'application/json',
                ...args.headers,
            },
        }),
    );
}

export async function put<T>(path: string, body: any, args: RequestInit = {}): Promise<HttpResponse<T>> {
    return http<T>(
        new Request(path, {
            method: 'put',
            body: JSON.stringify(body),
            ...args,
            headers: {
                'Content-Type': 'application/json',
                ...args.headers,
            },
        }),
    );
}
