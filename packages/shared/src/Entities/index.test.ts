import { formatBreadcrumb } from '.';

describe('Breadcrumb generation', () => {
    const XSBreadcrumd = '\\Database';
    const XSBreadcrumdExpect = '';

    const SBreadcrumd = '\\Database\\Modèle';
    const SBreadcrumdExpect = 'Database';

    const MBreadcrumd = '\\Database\\Modèle\\Table';
    const MBreadcrumdExpect = 'Database > Modèle';

    const LBreadcrumd = '\\Database\\Modèle\\Table\\Colonne';
    const LBreadcrumdExpect = 'Database > Modèle > Table';

    const XLBreadcrumd = '\\Database\\Modèle\\Table\\Colonne\\Row\\Cell';
    const XLBreadcrumdExpect = 'Database > ... > Colonne > Row';

    test('it should return the formatted breadcrumb', async () => {
        expect(formatBreadcrumb(XSBreadcrumd)).toEqual(XSBreadcrumdExpect);
        expect(formatBreadcrumb(SBreadcrumd)).toEqual(SBreadcrumdExpect);
        expect(formatBreadcrumb(MBreadcrumd)).toEqual(MBreadcrumdExpect);
        expect(formatBreadcrumb(LBreadcrumd)).toEqual(LBreadcrumdExpect);
        expect(formatBreadcrumb(XLBreadcrumd)).toEqual(XLBreadcrumdExpect);
    });
});
