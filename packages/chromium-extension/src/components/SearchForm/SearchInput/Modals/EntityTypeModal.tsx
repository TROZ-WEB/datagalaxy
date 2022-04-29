import React, { useState, FC } from 'react';
import { entitiesTypeRelatedInfos } from 'shared';
import { useStoreState } from '../../../../store/hooks';
import DGGlyph from '../../../ui/DGGlyph';
import ModalBase from '../ModalBase';

/* ---------- COMPONENT ---------- */

const EntityTypeModal: FC = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const [operator, setOperator] = useState('or');
    const { EntityType } = useStoreState((state) => state.modal);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'EntityType');

    const fields = [];

    for (const [key, value] of Object.entries(entitiesTypeRelatedInfos)) {
        if (key !== 'Usage' && key !== 'Diagram' && key !== 'DataProcessingItem') {
            const name = chrome.i18n.getMessage(`attribute_key_EntityType`);
            fields.push({
                id: key,
                label: chrome.i18n.getMessage(`entity_label_full_${key}`),
                icon: (
                    <DGGlyph
                        icon={value?.glyph}
                        kind={value?.kind.toLowerCase()}
                        tooltip={chrome.i18n.getMessage(`entity_label_full_${key}`)}
                    />
                ),
                checked: !!pickedFilters?.[index]?.filter?.values?.includes(key),
                name,
                nameUnit: name,
            });
        }
    }

    return (
        <ModalBase
            attributeKey="EntityType"
            fields={fields}
            isOpen={EntityType}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default EntityTypeModal;
