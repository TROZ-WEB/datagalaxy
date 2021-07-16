import { HttpResponse } from './types';

import 'isomorphic-fetch';

export async function http<T>(request: RequestInfo): Promise<HttpResponse<T>> {
    const response: HttpResponse<T> = await fetch(request);

    response.parsedBody = await response.json();

    if (!response.ok) {
        throw new Error(response.statusText);
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
