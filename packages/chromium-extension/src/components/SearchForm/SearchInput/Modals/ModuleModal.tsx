import React, { useState, FC } from 'react';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import ModalBase from '../ModalBase';
import { moduleFields } from './usages';

/* ---------- COMPONENT ---------- */

const ModuleModal: FC = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const { Module } = useStoreState((state) => state.modal);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Module');
    const enhancedModuleFields = moduleFields.map((item) => {
        return { ...item, checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.id) };
    });

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Module');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                icon: enhancedModuleFields.find((item) => item.id === id).icon,
                filter: { attributeKey: 'Module', operator: newOperator, values: [id] },
            };
            newPickedFilters.push(filter);
        } else {
            const { values } = newPickedFilters[filterIndex].filter;
            newPickedFilters[filterIndex].filter.operator = newOperator;
            const idIndex = values?.findIndex((item) => item === id);

            if (idIndex === -1) {
                values.push(id);
            } else {
                values.splice(idIndex, 1);
            }

            if (values.length === 0) {
                newPickedFilters.splice(filterIndex, 1);
            } else if (values.length > 1) {
                newPickedFilters[filterIndex].icon = null;
            }
        }

        updatePickedFilters(newPickedFilters);
    };

    const handleChangeIntersectionLogic = (params) => {
        setIntersectionLogic(params);
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Module');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].filter.operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            fields={enhancedModuleFields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            isOpen={Module}
            label={chrome.i18n.getMessage(`attribute_key_Module`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default ModuleModal;
