import { formatBreadcrumb } from '.';

describe('Breadcrumb generation', () => {
    const XSBreadcrumd = '\\Database';
    const XSBreadcrumdExpect = [];

    const SBreadcrumd = '\\Database\\Modèle';
    const SBreadcrumdExpect = ['Database'];

    const MBreadcrumd = '\\Database\\Modèle\\Table';
    const MBreadcrumdExpect = ['Database', 'Modèle'];

    const LBreadcrumd = '\\Database\\Modèle\\Table\\Colonne';
    const LBreadcrumdExpect = ['Database', 'Modèle', 'Table'];

    const XLBreadcrumd = '\\Database\\Modèle\\Table\\Colonne\\Row\\Cell';
    const XLBreadcrumdExpectShorten = ['Database', '...', 'Colonne', 'Row'];
    const XLBreadcrumdExpectDefault = ['Database', 'Modèle', 'Table', 'Colonne', 'Row'];

    test('it should return the formatted breadcrumb', async () => {
        expect(formatBreadcrumb(XSBreadcrumd).shorten).toEqual(XSBreadcrumdExpect);
        expect(formatBreadcrumb(SBreadcrumd).shorten).toEqual(SBreadcrumdExpect);
        expect(formatBreadcrumb(MBreadcrumd).shorten).toEqual(MBreadcrumdExpect);
        expect(formatBreadcrumb(LBreadcrumd).shorten).toEqual(LBreadcrumdExpect);
        expect(formatBreadcrumb(XLBreadcrumd).shorten).toEqual(XLBreadcrumdExpectShorten);
        expect(formatBreadcrumb(XLBreadcrumd).default).toEqual(XLBreadcrumdExpectDefault);
    });
});
