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

    request.headers.set('authorization', `Bearer ${await AccessToken.getInstance().getAccessToken()}`);
    const response: HttpResponse<T> = await fetch(request);

    response.parsedBody = await response.json();

    // Trigger custom error for unauthorized error (accessToken no more valid)
    if (!response.ok) {
        if (response.status === 401) {
            const newToken = await AccessToken.getInstance().refreshAccessToken();
            clonedRequest.headers.set('authorization', `Bearer ${newToken}`);
            const clonedResponse: HttpResponse<T> = await fetch(request);
            clonedResponse.parsedBody = await clonedResponse.json();
            if (!clonedResponse.ok) {
                throw new Error(clonedResponse.statusText);
            }
        } else {
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
