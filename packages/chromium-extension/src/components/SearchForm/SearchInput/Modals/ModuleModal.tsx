import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const ModuleModal = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');

    const index = pickedFilters?.findIndex((item) => item.attributeKey === 'Module');

    const fields = [
        {
            id: 'glossary',
            label: chrome.i18n.getMessage(`module_glossary`),
            checked: !!pickedFilters?.[index]?.values?.includes('glossary'),
        },
        {
            id: 'dictionary',
            label: chrome.i18n.getMessage(`module_dictionary`),
            checked: !!pickedFilters?.[index]?.values?.includes('dictionary'),
        },
        {
            id: 'dataprocessing',
            label: chrome.i18n.getMessage(`module_dataprocessing`),
            checked: !!pickedFilters?.[index]?.values?.includes('dataprocessing'),
        },
        {
            id: 'uses',
            label: chrome.i18n.getMessage(`module_uses`),
            checked: !!pickedFilters?.[index]?.values?.includes('uses'),
        },
    ];

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'Module');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'Module',
                operator: newOperator,
                values: [id],
            };
            newPickedFilters.push(filter);
        } else {
            const { values } = newPickedFilters[filterIndex];
            newPickedFilters[filterIndex].operator = newOperator;
            const idIndex = values?.findIndex((item) => item === id);

            if (idIndex === -1) {
                values.push(id);
            } else {
                values.splice(idIndex, 1);
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    const handleChangeIntersectionLogic = (params) => {
        setIntersectionLogic(params);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'Module');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <FilterModal
            fields={fields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            label={chrome.i18n.getMessage(`attribute_key_Module`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default ModuleModal;
