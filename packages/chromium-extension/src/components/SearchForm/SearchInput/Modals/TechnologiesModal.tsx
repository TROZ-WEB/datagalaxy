import React, { useEffect, useState, FC, useMemo } from 'react';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import ModalBase, { Field } from '../ModalBase';
import FieldIcon from './FieldIcon';
import { useSortArray } from './utils';

/* ---------- COMPONENT ---------- */

const TechnologiesModal: FC = () => {
    const dispatch = useStoreDispatch();
    const { technologies } = useStoreState((state) => state.filters);
    const pickedFilters = useStoreState((state) => state.filters.pickedFilters);
    const { TechnologyCode } = useStoreState((state) => state.modal);
    const { sortArray } = useSortArray();
    const [operator, setOperator] = useState('or');

    useEffect(() => {
        const fetchTechnologiesAPI = async () => {
            await dispatch.filters.fetchTechnologies(null);
        };

        fetchTechnologiesAPI();
    }, [dispatch]);

    const technologiesFields = useMemo(() => {
        const index = pickedFilters?.findIndex((item) => item?.filter?.attributeKey === 'TechnologyCode');

        return technologies?.map((technology) => {
            const t: Field = {
                id: technology?.technologyCode,
                label: technology.displayName,
                name: chrome.i18n.getMessage(`attribute_key_Technology`),
                checked: Boolean(pickedFilters?.[index]?.filter?.values?.includes(technology.technologyCode)),
            };

            if (technology.imageHash) {
                const newIcon = <FieldIcon hash={technology.imageHash} />;
                t.icon = newIcon;
            }

            return t;
        });
    }, [technologies, pickedFilters]);

    sortArray(technologiesFields);

    return (
        <ModalBase
            attributeKey="TechnologyCode"
            fields={technologiesFields}
            isOpen={TechnologyCode}
            operator={operator}
            setOperator={setOperator}
            multiselect
        />
    );
};

export default TechnologiesModal;
