/* eslint-disable import/prefer-default-export */

/**
 * Format the breadcrumd in the form 'Database > Modèle'
 *
 * @param {string} path - Represents the raw path as '\\Database\\Modèle\\Table'
 * @param {number} threshold - Threshold from which path is ellipsed
 * @return {string} Path as a breadcrumb
 */
export const formatBreadcrumb = (path: string, threshold: number = 3): string => {
    let base = path.trim().split('\\').slice(0, -1).filter(Boolean);

    if (base.length > threshold) {
        base = [base[0], '...', ...base.slice(base.length - 2, base.length)];
    }

    return base.join(' > ');
};
