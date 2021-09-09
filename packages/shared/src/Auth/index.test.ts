import { decodeJWT, getAccessToken } from '.';

const pat =
    'ew0KICAiJGlkIjogbnVsbCwNCiAgIiR0eXBlIjogIlN5c3RlbS5Db2xsZWN0aW9ucy5HZW5lcmljLkRpY3Rpb25hcnlgMltbU3lzdGVtLlN0cmluZywgU3lzdGVtLlByaXZhdGUuQ29yZUxpYl0sW1N5c3RlbS5PYmplY3QsIFN5c3RlbS5Qcml2YXRlLkNvcmVMaWJdXSwgU3lzdGVtLlByaXZhdGUuQ29yZUxpYiIsDQogICJ0eXAiOiAiSldUIiwNCiAgImFsZyI6ICJIUzI1NiINCn0.ew0KICAiJGlkIjogbnVsbCwNCiAgIiR0eXBlIjogIkRhdGFHYWxheHkuQ29yZS5EYXRhLk1lc3NhZ2VTZWN1cml0eS5QZXJzb25hbEFjY2Vzc1Rva2VuUGF5bG9hZCwgRGF0YUdhbGF4eS5Db3JlLkRhdGEiLA0KICAiZGdhcGkiOiAiaHR0cHM6Ly9kZXZuZXh0LmRhdGFnYWxheHkuY29tL25leHRfc2VydmVyLyIsDQogICJwdWJhcGkiOiAiaHR0cHM6Ly9hcGl1YXQuZGF0YWdhbGF4eS5jb20vdjIiLA0KICAiY2lkIjogIjkzNDFlNGExLWY5MGYtNDY2Ny1hNWE4LWI0ODhmNGY4MmM0YyIsDQogICJ1aWQiOiAiNzcwNWIwYmMtYTkwZC00Yjg5LWFjODMtMTNhYTQzNDBmYTJlIiwNCiAgImdpdmVuX25hbWUiOiAiUm9tYWluIiwNCiAgImZhbWlseV9uYW1lIjogIlNpbW9uIiwNCiAgImVtYWlsIjogInJvbWFpbi5zaW1vbkB0aGV0cmliZS5pbyIsDQogICJzdWIiOiAicm9tYWluLnNpbW9uQHRoZXRyaWJlLmlvIiwNCiAgImlhdCI6ICIxNjI1NzQ2MjUzIiwNCiAgImV4cCI6ICIxNjU3MjgyMjUzIg0KfQ.ORZRLsbduuK7EqCNfFKjtyqpHU0gZjEtSVJKVu2XcDQ';

const desiredPat = {
    $id: null,
    $type: 'DataGalaxy.Core.Data.MessageSecurity.PersonalAccessTokenPayload, DataGalaxy.Core.Data',
    dgapi: 'https://devnext.datagalaxy.com/next_server/',
    pubapi: 'https://apiuat.datagalaxy.com/v2',
    cid: '9341e4a1-f90f-4667-a5a8-b488f4f82c4c',
    uid: '7705b0bc-a90d-4b89-ac83-13aa4340fa2e',
    given_name: 'Romain',
    family_name: 'Simon',
    email: 'romain.simon@thetribe.io',
    sub: 'romain.simon@thetribe.io',
    iat: '1625746253',
    exp: '1657282253',
};

test('Decode PAT should return the desired PAT object', () => {
    const decodedPat = decodeJWT(pat);
    expect(decodedPat).toMatchObject(desiredPat);
});

test('Get access token from API', async () => {
    const decodedPat = decodeJWT(pat);
    const accessToken = await getAccessToken(decodedPat.pubapi, pat);
    expect(accessToken).not.toBeNull();
});
