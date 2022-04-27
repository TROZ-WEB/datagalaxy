import { EnhancedFilter, Filter, PickedFilter } from 'shared';

function keyListener(event) {
    event.stopImmediatePropagation();
}

/*
function formatFilters
take raw filters in parameters, returns enhanced PickedFilters
*/
function formatFilters(filters: Filter[], computeFilters) {
    const final: PickedFilter[] = [];
    filters.forEach((t) => {
        if (Array.isArray(t?.values)) {
            t?.values?.forEach((x) => {
                const y = JSON.parse(JSON.stringify(t));
                y.values = [x];
                final.push({ filter: y });
            });
        } else {
            const y = JSON.parse(JSON.stringify(t));
            y.values = [y.values];
            final.push({ filter: y });
        }
    });

    const enhancedQuickFiltersArray: EnhancedFilter[] = computeFilters(final);

    const newPickedFilters: PickedFilter[] = [];
    enhancedQuickFiltersArray.forEach((f: EnhancedFilter) => {
        const filterIndex = newPickedFilters?.findIndex(
            (item) => item?.filter?.attributeKey === f?.filter?.attributeKey,
        );
        if (filterIndex === -1) {
            const filter = {
                icon: [f.icon],
                name: f.name,
                content: [f.content],
                filter: f.filter,
            };

            newPickedFilters.push(filter);
        } else {
            const { icon, content } = newPickedFilters[filterIndex];
            icon.push(f.icon);
            content.push(f.content);
        }
    });

    return newPickedFilters;
}

export function isEllipsis(domElement?: HTMLElement) {
    return domElement?.offsetWidth < domElement?.scrollWidth;
}

export default keyListener;

export { formatFilters };
