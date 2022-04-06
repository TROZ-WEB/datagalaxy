import React, { useEffect, useState, FC } from 'react';
import { useStoreState, useStoreDispatch } from '../../../../store/hooks';
import ModalBase from '../ModalBase';
import FieldIcon from './FieldIcon';
import { useSortArray } from './utils';

/* ---------- COMPONENT ---------- */

const TechnologiesModal: FC = () => {
    const dispatch = useStoreDispatch();
    const { technologies } = useStoreState((state) => state.filters);
    const { TechnologyCode } = useStoreState((state) => state.modal);
    const { sortArray } = useSortArray();
    const [operator, setOperator] = useState('or');

    useEffect(() => {
        const fetchTechnologiesAPI = async () => {
            await dispatch.filters.fetchTechnologies(null);
        };

        fetchTechnologiesAPI();
    }, [dispatch]);

    const technologiesFields = technologies?.map((technology) => {
        interface field {
            id: string;
            label: string;
            icon?: React.ReactNode;
            name: string;
        }
        const t: field = {
            id: technology?.technologyCode,
            label: technology.displayName,
            name: chrome.i18n.getMessage(`attribute_key_Technology`),
        };

        if (technology.imageHash) {
            const newIcon = <FieldIcon hash={technology.imageHash} />;
            t.icon = newIcon;
        }

        return t;
    });

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
