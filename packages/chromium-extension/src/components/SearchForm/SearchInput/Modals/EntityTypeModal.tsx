import React, { useState, FC } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import { useStoreState, useStoreActions } from '../../../../store/hooks';
import DGGlyph from '../../../ui/DGGlyph';
import ModalBase from '../ModalBase';

/* ---------- COMPONENT ---------- */

const EntityTypeModal: FC = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { updatePickedFilters } = useStoreActions((actions) => actions.filters);
    const [intersectionLogic, setIntersectionLogic] = useState('or');
    const { EntityType } = useStoreState((state) => state.modal);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityType');

    const fields = [];

    for (const [key, value] of Object.entries(entitiesTypeRelatedInfos)) {
        fields.push({
            id: key,
            label: chrome.i18n.getMessage(`entity_label_full_${key}`),
            icon: <DGGlyph icon={value?.glyph} kind={value?.kind.toLowerCase()} />,
            checked: !!pickedFilters?.[index]?.filter?.values?.includes(key),
        });
    }

    const handleChange = (id) => {
        const newPickedFilters = [...pickedFilters];
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityType');
        const newOperator = intersectionLogic === 'or' ? 'contains' : 'matchAll';
        if (filterIndex === -1) {
            const filter = {
                icon: fields.find((item) => item.id === id).icon,
                filter: { attributeKey: 'EntityType', operator: newOperator, values: [id] },
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
        const filterIndex = newPickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityType');
        const newOperator = params === 'or' ? 'contains' : 'matchAll';
        if (filterIndex !== -1) {
            newPickedFilters[filterIndex].filter.operator = newOperator;
        }

        updatePickedFilters(newPickedFilters);
    };

    return (
        <ModalBase
            fields={fields}
            handleChangeIntersectionLogic={handleChangeIntersectionLogic}
            intersectionLogic={intersectionLogic}
            isOpen={EntityType}
            label={chrome.i18n.getMessage(`attribute_key_EntityType`)}
            onChange={handleChange}
            multiselect
        />
    );
};

export default EntityTypeModal;
