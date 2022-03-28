import React, { useState, FC } from 'react';
import { useStoreState } from '../../../../store/hooks';
import ModalBase from '../ModalBase';
import { moduleFields } from './utils';

/* ---------- COMPONENT ---------- */

const ModuleModal: FC = () => {
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const [operator, setOperator] = useState('or');
    const { Module } = useStoreState((state) => state.modal);

    const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'Module');
    const enhancedModuleFields = moduleFields.map((item) => {
        return { ...item, checked: !!pickedFilters?.[index]?.filter?.values?.includes(item.id) };
    });

    return (
        <ModalBase
            attributeKey="Module"
            fields={enhancedModuleFields}
            isOpen={Module}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default ModuleModal;
