import React, { useEffect } from 'react';
import { useStoreState, useStoreDispatch, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const TechnologiesModal = () => {
    const dispatch = useStoreDispatch();
    const technologies = useStoreState((state) => state.filters.technologies);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);

    useEffect(() => {
        const fetchTechnologiesAPI = async () => {
            await dispatch.filters.fetchTechnologies(null);
        };

        fetchTechnologiesAPI();
    }, [dispatch]);

    const technologiesFields = technologies?.technologies?.map((item) => {
        return {
            id: item.technologyCode,
            label: item.displayName,
        };
    });

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'TechnologyCode');
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'TechnologyCode',
                operator: 'contains',
                values: [id],
            };
            newPickedFilters.push(filter);
        } else {
            newPickedFilters[filterIndex].values = [id];
        }

        console.log(newPickedFilters);

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={technologiesFields}
            label={chrome.i18n.getMessage(`attribute_key_TechnologyCode`)}
            onChange={handleChange}
        />
    );
};

export default TechnologiesModal;
