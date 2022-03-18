import React, { useState } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import DGGlyph from '../../../ui/DGGlyph';
import FilterModal from '../FilterModal';

/* ---------- COMPONENT ---------- */

const EntityTypeModal = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');

    const index = pickedFilters?.findIndex((item) => item.attributeKey === 'EntityType');

    const fields = [];

    for (const [key, value] of Object.entries(entitiesTypeRelatedInfos)) {
        fields.push({
            id: key,
            label: chrome.i18n.getMessage(`entity_label_full_${key}`),
            icon: <DGGlyph icon={value.glyph} kind={value.kind.toLowerCase()} />,
            checked: !!pickedFilters?.[index]?.values?.includes(key),
        });
    }

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'EntityType');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                attributeKey: 'EntityType',
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
        const filterIndex = newPickedFilters?.findIndex((item) => item.attributeKey === 'EntityType');
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
            label={chrome.i18n.getMessage(`attribute_key_EntityType`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default EntityTypeModal;
